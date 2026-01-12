import { ChatMode, ChatModeConfig, getChatModeName } from '@/shared/config';
import { ThreadItem } from '@/shared/types';
import { buildCoreMessagesFromThreadItems } from '@/shared/utils';
import { nanoid } from 'nanoid';
import { useParams, useRouter } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { useApiKeysStore, useAppStore, useChatStore, useMcpToolsStore } from '../store';
import { SETTING_TABS } from '../store/app-zustand-store';
import { toast, ToastAction } from '@/common/ui';

export type AgentContextType = {
    runAgent: (body: any) => Promise<void>;
    handleSubmit: (args: {
        formData: FormData;
        newThreadId?: string;
        existingThreadItemId?: string;
        newChatMode?: string;
        messages?: ThreadItem[];
        useWebSearch?: boolean;
        showSuggestions?: boolean;
    }) => Promise<void>;
    updateContext: (threadId: string, data: any) => void;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider = ({ children }: { children: ReactNode }) => {
    const { threadId: currentThreadId } = useParams();
    const isSignedIn = false; // Auth removed
    const user = null; // Auth removed

    const {
        updateThreadItem,
        setIsGenerating,
        setAbortController,
        createThreadItem,
        setCurrentThreadItem,
        setCurrentSources,
        updateThread,
        chatMode,
        customInstructions,
    } = useChatStore(state => ({
        updateThreadItem: state.updateThreadItem,
        setIsGenerating: state.setIsGenerating,
        setAbortController: state.setAbortController,
        createThreadItem: state.createThreadItem,
        setCurrentThreadItem: state.setCurrentThreadItem,
        setCurrentSources: state.setCurrentSources,
        updateThread: state.updateThread,
        chatMode: state.chatMode,
        customInstructions: state.customInstructions,
    }));
    const { push } = useRouter();

    const getSelectedMCP = useMcpToolsStore(state => state.getSelectedMCP);
    const apiKeys = useApiKeysStore(state => state.getAllKeys);
    const apiKeyMode = useApiKeysStore(state => state.mode);
    const hasApiKeyForChatMode = useApiKeysStore(state => state.hasApiKeyForChatMode);
    const getApiKeyNameForChatMode = useApiKeysStore(state => state.getApiKeyNameForChatMode);
    const setIsSettingsOpen = useAppStore(state => state.setIsSettingsOpen);
    const setSettingTab = useAppStore(state => state.setSettingTab);
    const setShowSignInModal = useAppStore(state => state.setShowSignInModal);


    // In-memory store for thread items
    const threadItemMap = useMemo(() => new Map<string, ThreadItem>(), []);

    // Define common event types to reduce repetition
    const EVENT_TYPES = [
        'steps',
        'sources',
        'answer',
        'error',
        'status',
        'suggestions',
        'toolCalls',
        'toolResults',
        'object',
    ];

    // Helper: Update in-memory and store thread item
    const handleThreadItemUpdate = useCallback(
        (
            threadId: string,
            threadItemId: string,
            eventType: string,
            eventData: any,
            parentThreadItemId?: string,
            shouldPersistToDB: boolean = true
        ) => {
            console.log(
                'handleThreadItemUpdate',
                threadItemId,
                eventType,
                eventData,
                shouldPersistToDB
            );
            // Try to get from map first, then from store if not found
            let prevItem = threadItemMap.get(threadItemId);
            if (!prevItem) {
                // Fetch from store if not in map to preserve query and other fields
                const storeItem = useChatStore.getState().threadItems.find(t => t.id === threadItemId);
                prevItem = storeItem || ({} as ThreadItem);
                if (storeItem) {
                    threadItemMap.set(threadItemId, storeItem);
                }
            }
            
            const updatedItem: ThreadItem = {
                ...prevItem,
                query: eventData?.query || prevItem.query || '',
                mode: eventData?.mode || prevItem.mode,
                threadId,
                parentId: parentThreadItemId || prevItem.parentId,
                id: threadItemId,
                object: eventData?.object || prevItem.object,
                createdAt: prevItem.createdAt || new Date(),
                updatedAt: new Date(),
                ...(eventType === 'answer'
                    ? {
                          answer: {
                              ...eventData.answer,
                              text: eventData.answer.text, // Backend already sends full accumulated text
                          },
                      }
                    : { [eventType]: eventData[eventType] }),
            };

            threadItemMap.set(threadItemId, updatedItem);
            updateThreadItem(threadId, { ...updatedItem, persistToDB: true });
        },
        [threadItemMap, updateThreadItem]
    );

    // const { startWorkflow, abortWorkflow } = useWorkflowWorker(
    //     useCallback(
    //         (data: any) => {
    //             if (
    //                 data?.threadId &&
    //                 data?.threadItemId &&
    //                 data.event &&
    //                 EVENT_TYPES.includes(data.event)
    //             ) {
    //                 handleThreadItemUpdate(
    //                     data.threadId,
    //                     data.threadItemId,
    //                     data.event,
    //                     data,
    //                     data.parentThreadItemId
    //                 );
    //             }
    //
    //             if (data.type === 'done') {
    //                 setIsGenerating(false);
    //                 setTimeout(fetchRemainingCredits, 1000);
    //                 if (data?.threadItemId) {
    //                     threadItemMap.delete(data.threadItemId);
    //                 }
    //             }
    //         },
    //         [handleThreadItemUpdate, setIsGenerating, fetchRemainingCredits, threadItemMap]
    //     )
    // );

    const runAgent = useCallback(
        async (body: any) => {
            console.log('[DEBUG] runAgent called with body:', body);
            
            const abortController = new AbortController();
            setAbortController(abortController);
            setIsGenerating(true);
            const startTime = performance.now();

            abortController.signal.addEventListener('abort', () => {
                console.info('[DEBUG] Abort controller triggered');
                setIsGenerating(false);
                updateThreadItem(body.threadId, {
                    id: body.threadItemId,
                    status: 'ABORTED',
                    persistToDB: true,
                });
            });

            try {
                console.log('[DEBUG] Fetching /api/completion...');
                
                const response = await fetch('/api/completion', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                    credentials: 'include',
                    cache: 'no-store',
                    signal: abortController.signal,
                });
                
                console.log('[DEBUG] Response received:', {
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries())
                });

                if (!response.ok) {
                    console.error('[DEBUG] Response not OK, status:', response.status);
                    let errorText = await response.text();
                    console.error('[DEBUG] Error text:', errorText);

                    if (response.status === 429 && isSignedIn) {
                        errorText =
                            'You have reached the daily limit of requests. Please try again tomorrow or Use your own API key.';
                    }

                    if (response.status === 429 && !isSignedIn) {
                        errorText =
                            'You have reached the daily limit of requests. Please sign in to enjoy more requests.';
                    }

                    setIsGenerating(false);
                    updateThreadItem(body.threadId, {
                        id: body.threadItemId,
                        status: 'ERROR',
                        error: errorText,
                        persistToDB: true,
                    });
                    console.error('[DEBUG] Error response:', errorText);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (!response.body) {
                    console.error('[DEBUG] No response body received');
                    throw new Error('No response body received');
                }
                
                console.log('[DEBUG] Starting to read response stream...');

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let lastDbUpdate = Date.now();
                const DB_UPDATE_INTERVAL = 1000;
                let eventCount = 0;
                const streamStartTime = performance.now();

                let buffer = '';
                
                console.log('[DEBUG] Stream reader initialized');

                while (true) {
                    try {
                        const { value, done } = await reader.read();
                        
                        if (done) {
                            console.log('[DEBUG] Stream done, total events:', eventCount);
                            break;
                        }

                        buffer += decoder.decode(value, { stream: true });
                        const messages = buffer.split('\n\n');
                        buffer = messages.pop() || '';

                        for (const message of messages) {
                            if (!message.trim()) continue;

                            const eventMatch = message.match(/^event: (.+)$/m);
                            const dataMatch = message.match(/^data: (.+)$/m);

                            if (eventMatch && dataMatch) {
                                const currentEvent = eventMatch[1];
                                eventCount++;
                                
                                console.log('[DEBUG] Event received:', currentEvent, 'count:', eventCount);

                                try {
                                    const data = JSON.parse(dataMatch[1]);
                                    console.log('[DEBUG] Event data:', data);
                                    if (
                                        EVENT_TYPES.includes(currentEvent) &&
                                        data?.threadId &&
                                        data?.threadItemId
                                    ) {
                                        const shouldPersistToDB =
                                            Date.now() - lastDbUpdate >= DB_UPDATE_INTERVAL;
                                        handleThreadItemUpdate(
                                            data.threadId,
                                            data.threadItemId,
                                            currentEvent,
                                            data,
                                            data.parentThreadItemId,
                                            shouldPersistToDB
                                        );
                                        if (shouldPersistToDB) {
                                            lastDbUpdate = Date.now();
                                        }
                                    } else if (currentEvent === 'done' && data.type === 'done') {
                                        setIsGenerating(false);
                                        const streamDuration = performance.now() - streamStartTime;
                                        console.log(
                                            'done event received',
                                            eventCount,
                                            `Stream duration: ${streamDuration.toFixed(2)}ms`
                                        );
                                        if (data.threadItemId) {
                                            threadItemMap.delete(data.threadItemId);
                                        }
                                        if (data.status === 'error') {
                                            console.error('Stream error:', data.error);
                                        }
                                    }
                                } catch (jsonError) {
                                    console.warn(
                                        'JSON parse error for data:',
                                        dataMatch[1],
                                        jsonError
                                    );
                                }
                            }
                        }
                    } catch (readError) {
                        console.error('Error reading from stream:', readError);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        continue;
                    }
                }
            } catch (streamError: any) {
                const totalTime = performance.now() - startTime;
                console.error(
                    'Fatal stream error:',
                    streamError,
                    `Total time: ${totalTime.toFixed(2)}ms`
                );
                setIsGenerating(false);
                if (streamError.name === 'AbortError') {
                    updateThreadItem(body.threadId, {
                        id: body.threadItemId,
                        status: 'ABORTED',
                        error: 'Generation aborted',
                    });
                } else if (streamError.message.includes('429')) {
                    updateThreadItem(body.threadId, {
                        id: body.threadItemId,
                        status: 'ERROR',
                        error: 'You have reached the daily limit of requests. Please try again tomorrow or Use your own API key.',
                    });
                } else {
                    updateThreadItem(body.threadId, {
                        id: body.threadItemId,
                        status: 'ERROR',
                        error: 'Something went wrong. Please try again.',
                    });
                }
            } finally {
                setIsGenerating(false);

                const totalTime = performance.now() - startTime;
                console.info(`Stream completed in ${totalTime.toFixed(2)}ms`);
            }
        },
        [
            setAbortController,
            setIsGenerating,
            updateThreadItem,
            handleThreadItemUpdate,
            EVENT_TYPES,
            threadItemMap,
        ]
    );

    const handleSubmit = useCallback(
        async ({
            formData,
            newThreadId,
            existingThreadItemId,
            newChatMode,
            messages,
            useWebSearch,
            showSuggestions,
        }: {
            formData: FormData;
            newThreadId?: string;
            existingThreadItemId?: string;
            newChatMode?: string;
            messages?: ThreadItem[];
            useWebSearch?: boolean;
            showSuggestions?: boolean;
        }) => {
            const mode = (newChatMode || chatMode) as ChatMode;
            if (
                !isSignedIn &&
                !!ChatModeConfig[mode as keyof typeof ChatModeConfig]?.isAuthRequired
            ) {
                push('/sign-in');

                return;
            }

            const threadId = currentThreadId?.toString() || newThreadId;
            if (!threadId) return;

            // Update thread title
            updateThread({ id: threadId, title: formData.get('query') as string });

            const optimisticAiThreadItemId = existingThreadItemId || nanoid();
            const query = formData.get('query') as string;
            const imageAttachment = formData.get('imageAttachment') as string;

            const aiThreadItem: ThreadItem = {
                id: optimisticAiThreadItemId,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: 'QUEUED',
                threadId,
                query,
                imageAttachment,
                mode,
            };

            // Add to threadItemMap immediately to preserve query when updates arrive
            threadItemMap.set(optimisticAiThreadItemId, aiThreadItem);
            
            createThreadItem(aiThreadItem);
            setCurrentThreadItem(aiThreadItem);
            setIsGenerating(true);
            setCurrentSources([]);

            // Build core messages array
            const coreMessages = buildCoreMessagesFromThreadItems({
                messages: messages || [],
                query,
                imageAttachment,
            });

            const currentApiKeys = apiKeys();
            console.log('[DEBUG SUBMIT] API Keys available:', {
                hasOpenAI: !!currentApiKeys.OPENAI_API_KEY,
                hasAnthropic: !!currentApiKeys.ANTHROPIC_API_KEY,
                hasGemini: !!currentApiKeys.GEMINI_API_KEY,
                hasFireworks: !!currentApiKeys.FIREWORKS_API_KEY,
            });
            
            // Check if API key is required and available
            const hasApiKey = await hasApiKeyForChatMode(mode);
            console.log('[DEBUG SUBMIT] hasApiKeyForChatMode:', hasApiKey, 'mode:', mode, 'apiKeyMode:', apiKeyMode);

            if (!hasApiKey) {
                const apiKeyName = getApiKeyNameForChatMode(mode);
                const chatModeName = getChatModeName(mode);
                
                toast({
                    variant: 'destructive',
                    title: 'API Key Required',
                    description: apiKeyName 
                        ? `To use ${chatModeName}, please add your ${apiKeyName} in Settings.`
                        : `To use ${chatModeName}, please add your API key in Settings.`,
                    action: (
                        <ToastAction
                            altText="Open Settings"
                            onClick={() => {
                                setIsSettingsOpen(true);
                                setSettingTab(SETTING_TABS.API_KEYS);
                            }}
                        >
                            Open Settings
                        </ToastAction>
                    ),
                });
                setIsGenerating(false);
                return;
            }

            // ALWAYS use runAgent (API route) - the web worker path is deprecated
            console.log('[DEBUG SUBMIT] Using runAgent (API route)');
                runAgent({
                    mode: newChatMode || chatMode,
                    prompt: query,
                    threadId,
                    messages: coreMessages,
                    mcpConfig: getSelectedMCP(),
                    threadItemId: optimisticAiThreadItemId,
                    customInstructions,
                    parentThreadItemId: '',
                    webSearch: useWebSearch,
                    showSuggestions: showSuggestions ?? true,
                    apiKeys: apiKeyMode === 'own' ? currentApiKeys : undefined, // Only pass keys in "own" mode
                    apiKeyMode: apiKeyMode, // Pass mode preference to backend
                });
        },
        [
            isSignedIn,
            currentThreadId,
            chatMode,
            setShowSignInModal,
            updateThread,
            createThreadItem,
            setCurrentThreadItem,
            setIsGenerating,
            setCurrentSources,
            // abortWorkflow,
            // startWorkflow,
            customInstructions,
            getSelectedMCP,
            apiKeys,
            hasApiKeyForChatMode,
            getApiKeyNameForChatMode,
            setIsSettingsOpen,
            setSettingTab,
            updateThreadItem,
            runAgent,
        ]
    );

    const updateContext = useCallback(
        (threadId: string, data: any) => {
            console.info('Updating context', data);
            updateThreadItem(threadId, {
                id: data.threadItemId,
                parentId: data.parentThreadItemId,
                threadId: data.threadId,
                metadata: data.context,
            });
        },
        [updateThreadItem]
    );

    const contextValue = useMemo(
        () => ({
            runAgent,
            handleSubmit,
            updateContext,
        }),
        [runAgent, handleSubmit, updateContext]
    );

    return <AgentContext.Provider value={contextValue}>{children}</AgentContext.Provider>;
};

export const useAgentStream = (): AgentContextType => {
    const context = useContext(AgentContext);
    if (!context) {
        throw new Error('useAgentStream must be used within an AgentProvider');
    }
    return context;
};
