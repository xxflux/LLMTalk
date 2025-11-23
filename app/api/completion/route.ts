import { Geo, geolocation } from '@vercel/functions';
import { NextRequest } from 'next/server';
import { executeStream, sendMessage } from './stream-handlers';
import { completionRequestSchema, SSE_HEADERS } from './types';

export async function POST(request: NextRequest) {
    console.log('[DEBUG API] POST /api/completion called');
    
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: SSE_HEADERS });
    }

    try {
        const userId = undefined; // No authentication

        const parsed = await request.json().catch(() => ({}));
        console.log('[DEBUG API] Request body:', parsed);
        
        const validatedBody = completionRequestSchema.safeParse(parsed);

        if (!validatedBody.success) {
            console.error('[DEBUG API] Validation failed:', validatedBody.error.format());
            return new Response(
                JSON.stringify({
                    error: 'Invalid request body',
                    details: validatedBody.error.format(),
                }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const { data } = validatedBody;
        console.log('[DEBUG API] Validated data:', data);

        const abortController = new AbortController();

        request.signal.addEventListener('abort', () => {
            abortController.abort();
        });

        const gl = geolocation(request);

        console.log('[DEBUG API] Creating completion stream...');
        const stream = createCompletionStream({
            data,
            userId,
            abortController,
            gl,
        });

        console.log('[DEBUG API] Returning stream response');
        return new Response(stream, { headers: SSE_HEADERS });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error', details: String(error) }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

function createCompletionStream({
    data,
    userId,
    abortController,
    gl,
}: {
    data: any;
    userId?: string;
    abortController: AbortController;
    gl: Geo;
}) {
    const encoder = new TextEncoder();

    return new ReadableStream({
        async start(controller) {
            console.log('[DEBUG API] Stream started');
            let heartbeatInterval: NodeJS.Timeout | null = null;

            heartbeatInterval = setInterval(() => {
                console.log('[DEBUG API] Sending heartbeat');
                controller.enqueue(encoder.encode(': heartbeat\n\n'));
            }, 15000);

            try {
                console.log('[DEBUG API] Calling executeStream...');
                await executeStream({
                    controller,
                    encoder,
                    data,
                    abortController,
                    gl,
                    userId: userId ?? undefined,
                    onFinish: async () => {
                        // No credit deduction
                    },
                });
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log('abortController.signal.aborted');
                    sendMessage(controller, encoder, {
                        type: 'done',
                        status: 'aborted',
                        threadId: data.threadId,
                        threadItemId: data.threadItemId,
                        parentThreadItemId: data.parentThreadItemId,
                    });
                } else {
                    console.log('sending error message');
                    sendMessage(controller, encoder, {
                        type: 'done',
                        status: 'error',
                        error: error instanceof Error ? error.message : String(error),
                        threadId: data.threadId,
                        threadItemId: data.threadItemId,
                        parentThreadItemId: data.parentThreadItemId,
                    });
                }
            } finally {
                if (heartbeatInterval) {
                    clearInterval(heartbeatInterval);
                }
                controller.close();
            }
        },
        cancel() {
            console.log('cancelling stream');
            abortController.abort();
        },
    });
}
