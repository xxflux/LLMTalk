import { streamText } from 'ai';
import { logger } from '@/shared/logger';
import { EVENT_TYPES, posthog } from '@/shared/posthog';
import { Geo } from '@vercel/functions';
import { CompletionRequestType, StreamController } from './types';
import { sanitizePayloadForJSON } from './utils';
import { getLanguageModel } from '@/common/ai/providers';
import { getModelFromChatMode } from '@/common/ai/models';

export function sendMessage(
    controller: StreamController,
    encoder: TextEncoder,
    payload: Record<string, any>
) {
    try {
        console.log('[DEBUG STREAM] sendMessage called with type:', payload.type);
        
        if (payload.content && typeof payload.content === 'string') {
            payload.content = normalizeMarkdownContent(payload.content);
        }

        const sanitizedPayload = sanitizePayloadForJSON(payload);
        const message = `event: ${payload.type}\ndata: ${JSON.stringify(sanitizedPayload)}\n\n`;

        console.log('[DEBUG STREAM] Enqueueing message:', message.substring(0, 200) + '...');
        controller.enqueue(encoder.encode(message));
        controller.enqueue(new Uint8Array(0));
    } catch (error) {
        logger.error('Error serializing message payload', error, {
            payloadType: payload.type,
            threadId: payload.threadId,
        });

        const errorMessage = `event: done\ndata: ${JSON.stringify({
            type: 'done',
            status: 'error',
            error: 'Failed to serialize payload',
            threadId: payload.threadId,
            threadItemId: payload.threadItemId,
            parentThreadItemId: payload.parentThreadItemId,
        })}\n\n`;
        controller.enqueue(encoder.encode(errorMessage));
    }
}

export function normalizeMarkdownContent(content: string): string {
    const normalizedContent = content.replace(/\\n/g, '\n');
    return normalizedContent;
}

export async function executeStream({
    controller,
    encoder,
    data,
    abortController,
    gl,
    userId,
    onFinish,
}: {
    controller: StreamController;
    encoder: TextEncoder;
    data: CompletionRequestType;
    abortController: AbortController;
    userId?: string;
    gl?: Geo;
    onFinish?: () => Promise<void>;
}): Promise<{ success: boolean } | Response> {
    console.log('[DEBUG STREAM] executeStream called with data:', {
        mode: data.mode,
        prompt: data.prompt?.substring(0, 50) + '...',
        threadId: data.threadId,
        threadItemId: data.threadItemId,
        hasApiKeys: !!data.apiKeys
    });
    
    try {
        // Check and log available API keys
        console.log('[DEBUG STREAM] API Keys available:', {
            fromEnv: {
                hasOpenAI: !!process.env.OPENAI_API_KEY,
                hasAnthropic: !!process.env.ANTHROPIC_API_KEY,
                hasGemini: !!process.env.GEMINI_API_KEY,
                hasFireworks: !!process.env.FIREWORKS_API_KEY,
            },
            fromFrontend: {
                hasOpenAI: !!data.apiKeys?.OPENAI_API_KEY,
                hasAnthropic: !!data.apiKeys?.ANTHROPIC_API_KEY,
                hasGemini: !!data.apiKeys?.GEMINI_API_KEY,
                hasFireworks: !!data.apiKeys?.FIREWORKS_API_KEY,
            }
        });
        
        // Prioritize .env file, fallback to frontend API keys
        if (data.apiKeys) {
            if (data.apiKeys.OPENAI_API_KEY && !process.env.OPENAI_API_KEY) {
                process.env.OPENAI_API_KEY = data.apiKeys.OPENAI_API_KEY;
                console.log('[DEBUG STREAM] Using OpenAI key from frontend');
            }
            if (data.apiKeys.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_API_KEY) {
                process.env.ANTHROPIC_API_KEY = data.apiKeys.ANTHROPIC_API_KEY;
                console.log('[DEBUG STREAM] Using Anthropic key from frontend');
            }
            if (data.apiKeys.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
                process.env.GEMINI_API_KEY = data.apiKeys.GEMINI_API_KEY;
                console.log('[DEBUG STREAM] Using Gemini key from frontend');
            }
            if (data.apiKeys.FIREWORKS_API_KEY && !process.env.FIREWORKS_API_KEY) {
                process.env.FIREWORKS_API_KEY = data.apiKeys.FIREWORKS_API_KEY;
                console.log('[DEBUG STREAM] Using Fireworks key from frontend');
            }
            if (data.apiKeys.TOGETHER_API_KEY && !process.env.TOGETHER_API_KEY) {
                process.env.TOGETHER_API_KEY = data.apiKeys.TOGETHER_API_KEY;
                console.log('[DEBUG STREAM] Using Together key from frontend');
            }
            if (data.apiKeys.SERPER_API_KEY && !process.env.SERPER_API_KEY) {
                process.env.SERPER_API_KEY = data.apiKeys.SERPER_API_KEY;
                console.log('[DEBUG STREAM] Using Serper key from frontend');
            }
            if (data.apiKeys.JINA_API_KEY && !process.env.JINA_API_KEY) {
                process.env.JINA_API_KEY = data.apiKeys.JINA_API_KEY;
                console.log('[DEBUG STREAM] Using Jina key from frontend');
            }
        }
        
        // Log final Gemini API key status
        if (process.env.GEMINI_API_KEY) {
            console.log('[DEBUG STREAM] ✅ Gemini API key available:', process.env.GEMINI_API_KEY.substring(0, 10) + '...' + process.env.GEMINI_API_KEY.slice(-4));
        } else {
            console.error('[DEBUG STREAM] ❌ No Gemini API key found!');
        }

        const { signal } = abortController;

        // Get the model for the chat mode
        const modelEnum = getModelFromChatMode(data.mode);
        const model = getLanguageModel(modelEnum);
        
        console.log('[DEBUG STREAM] Using model:', modelEnum, 'for mode:', data.mode);

        // Build system prompt
        const today = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        let systemPrompt = `You are a helpful AI assistant. Today is ${today}.`;
        
        if (gl?.city && gl?.country) {
            systemPrompt += ` The user is located in ${gl.city}, ${gl.country}.`;
        }
        
        if (data.customInstructions && data.customInstructions.length < 6000) {
            systemPrompt += `\n\n${data.customInstructions}`;
        }

        // Build messages array
        const messages = data.messages || [];
        
        console.log('[DEBUG STREAM] Starting LLM stream with', messages.length, 'messages');

        // Stream the response
        const result = streamText({
            model,
            system: systemPrompt,
            messages,
            abortSignal: signal,
        });

        let fullText = '';
        
        // Send initial message
        sendMessage(controller, encoder, {
            type: 'answer',
            threadId: data.threadId,
            threadItemId: data.threadItemId,
            parentThreadItemId: data.parentThreadItemId,
            answer: {
                text: '',
                status: 'PENDING',
            },
        });

        // Stream text chunks
        for await (const chunk of result.textStream) {
            if (signal.aborted) {
                console.log('[DEBUG STREAM] Stream aborted');
                break;
            }

            fullText += chunk;
            
            sendMessage(controller, encoder, {
                type: 'answer',
                threadId: data.threadId,
                threadItemId: data.threadItemId,
                parentThreadItemId: data.parentThreadItemId,
                answer: {
                    text: fullText,
                    status: 'PENDING',
                },
            });
        }

        console.log('[DEBUG STREAM] Stream completed, total length:', fullText.length);

        // Send final message
        sendMessage(controller, encoder, {
            type: 'answer',
            threadId: data.threadId,
            threadItemId: data.threadItemId,
            parentThreadItemId: data.parentThreadItemId,
            answer: {
                text: fullText,
                status: 'COMPLETED',
            },
        });

        // Track completion
        if (userId) {
            posthog.capture({
                event: EVENT_TYPES.WORKFLOW_SUMMARY,
                userId,
                properties: {
                    userId,
                    query: data.prompt,
                    mode: data.mode,
                    webSearch: data.webSearch || false,
                    threadId: data.threadId,
                    threadItemId: data.threadItemId,
                    responseLength: fullText.length,
                },
            });
        }

        console.log('[DEBUG STREAM] Sending done event');
        
        sendMessage(controller, encoder, {
            type: 'done',
            status: 'complete',
            threadId: data.threadId,
            threadItemId: data.threadItemId,
            parentThreadItemId: data.parentThreadItemId,
        });

        posthog.flush();

        if (onFinish) {
            await onFinish();
        }

        return { success: true };
    } catch (error: any) {
        console.error('[DEBUG STREAM] Fatal error:', error);
        
        logger.error('Fatal stream error', error, {
            threadId: data.threadId,
            mode: data.mode,
        });

        sendMessage(controller, encoder, {
            type: 'done',
            status: 'error',
            error: error.message || 'An error occurred',
            threadId: data.threadId,
            threadItemId: data.threadItemId,
            parentThreadItemId: data.parentThreadItemId,
        });

        return { success: false };
    }
}
