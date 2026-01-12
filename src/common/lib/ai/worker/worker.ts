import { ChatMode } from '@/shared/config';
// Workflow removed - this worker is now a stub
// Create context for the worker
const ctx: Worker = self as any;

// Create a mock process.env object for the worker context
if (typeof process === 'undefined') {
    (self as any).process = { env: {} };
}

// Store for API keys
let apiKeys: Record<string, string> = {};

// Handle messages from the main thread
ctx.addEventListener('message', async (event: MessageEvent) => {
    const { type, payload } = event.data;

    try {
        if (type === 'START_WORKFLOW') {
            const {
                mode,
                question,
                threadId,
                threadItemId,
                parentThreadItemId,
                apiKeys: newApiKeys,
            } = payload;

            // Set API keys if provided
            if (newApiKeys) {
                apiKeys = newApiKeys;
                self.AI_API_KEYS = {
                    openai: apiKeys.OPENAI_API_KEY,
                    anthropic: apiKeys.ANTHROPIC_API_KEY,
                    fireworks: apiKeys.FIREWORKS_API_KEY,
                    google: apiKeys.GEMINI_API_KEY,
                    together: apiKeys.TOGETHER_API_KEY,
                };
                self.SERPER_API_KEY = apiKeys.SERPER_API_KEY;
                self.JINA_API_KEY = apiKeys.JINA_API_KEY;
                self.NEXT_PUBLIC_APP_URL = apiKeys.NEXT_PUBLIC_APP_URL;
            }

            // Workflow removed - send error message
            ctx.postMessage({
                type: 'done',
                status: 'error',
                error: 'Workflows have been removed. Please use the API completion endpoint instead.',
                threadId,
                threadItemId,
                parentThreadItemId,
            });
        } else if (type === 'ABORT_WORKFLOW') {
            // Abort handling - just acknowledge
            ctx.postMessage({
                type: 'done',
                status: 'aborted',
                threadId: payload.threadId,
                threadItemId: payload.threadItemId,
                parentThreadItemId: payload.parentThreadItemId,
            });
        }
    } catch (error) {
        console.error('[Worker] Error in worker:', error);
        ctx.postMessage({
            type: 'done',
            status: 'error',
            error: error instanceof Error ? error.message : String(error),
            threadId: payload?.threadId,
            threadItemId: payload?.threadItemId,
            parentThreadItemId: payload?.parentThreadItemId,
        });
    }
});
