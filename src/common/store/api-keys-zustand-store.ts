import { ChatMode } from '@/shared/config';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ApiKeys = {
    OPENAI_API_KEY?: string;
    ANTHROPIC_API_KEY?: string;
    GEMINI_API_KEY?: string;
    JINA_API_KEY?: string;
    FIREWORKS_API_KEY?: string;
    SERPER_API_KEY?: string;
};

export type ApiKeyMode = 'system' | 'own';

type ApiKeysState = {
    keys: ApiKeys;
    mode: ApiKeyMode;
    setKey: (provider: keyof ApiKeys, key: string) => void;
    removeKey: (provider: keyof ApiKeys) => void;
    clearAllKeys: () => void;
    getAllKeys: () => ApiKeys;
    setMode: (mode: ApiKeyMode) => void;
    hasApiKeyForChatMode: (chatMode: ChatMode) => Promise<boolean>;
    getApiKeyNameForChatMode: (chatMode: ChatMode) => string | null;
};

export const useApiKeysStore = create<ApiKeysState>()(
    persist(
        (set, get) => ({
            keys: {},
            mode: 'own' as ApiKeyMode,
            setKey: (provider, key) =>
                set(state => ({
                    keys: { ...state.keys, [provider]: key },
                })),
            removeKey: provider =>
                set(state => {
                    const newKeys = { ...state.keys };
                    delete newKeys[provider];
                    return { keys: newKeys };
                }),
            clearAllKeys: () => set({ keys: {} }),
            getAllKeys: () => get().keys,
            setMode: (mode: ApiKeyMode) => set({ mode }),
            hasApiKeyForChatMode: async (chatMode: ChatMode) => {
                const state = get();
                const mode = state.mode || 'own';
                
                // In "own" mode, check Settings store
                if (mode === 'own') {
                    const apiKeys = state.keys;
                    switch (chatMode) {
                        case ChatMode.O4_Mini:
                        case ChatMode.GPT_4o_Mini:
                        case ChatMode.GPT_4_1_Mini:
                        case ChatMode.GPT_4_1_Nano:
                        case ChatMode.GPT_4_1:
                            return !!apiKeys['OPENAI_API_KEY'];
                        case ChatMode.GEMINI_2_FLASH:
                            return !!apiKeys['GEMINI_API_KEY'];
                        case ChatMode.CLAUDE_3_5_SONNET:
                        case ChatMode.CLAUDE_3_7_SONNET:
                            return !!apiKeys['ANTHROPIC_API_KEY'];
                        case ChatMode.DEEPSEEK_R1:
                        case ChatMode.LLAMA_4_SCOUT:
                            return !!apiKeys['FIREWORKS_API_KEY'];
                        default:
                            return false;
                    }
                }
                
                // In "system" mode, check .env via API
                try {
                    const response = await fetch('/api/check-env-keys');
                    if (!response.ok) return false;
                    const envKeys = await response.json();
                    
                    switch (chatMode) {
                        case ChatMode.O4_Mini:
                        case ChatMode.GPT_4o_Mini:
                        case ChatMode.GPT_4_1_Mini:
                        case ChatMode.GPT_4_1_Nano:
                        case ChatMode.GPT_4_1:
                            return !!envKeys.OPENAI_API_KEY;
                        case ChatMode.GEMINI_2_FLASH:
                            return !!envKeys.GEMINI_API_KEY;
                        case ChatMode.CLAUDE_3_5_SONNET:
                        case ChatMode.CLAUDE_3_7_SONNET:
                            return !!envKeys.ANTHROPIC_API_KEY;
                        case ChatMode.DEEPSEEK_R1:
                        case ChatMode.LLAMA_4_SCOUT:
                            return !!envKeys.FIREWORKS_API_KEY;
                        default:
                            return false;
                    }
                } catch (error) {
                    console.error('Error checking .env keys:', error);
                    return false;
                }
            },
            getApiKeyNameForChatMode: (chatMode: ChatMode) => {
                switch (chatMode) {
                    case ChatMode.O4_Mini:
                    case ChatMode.GPT_4o_Mini:
                    case ChatMode.GPT_4_1_Mini:
                    case ChatMode.GPT_4_1_Nano:
                    case ChatMode.GPT_4_1:
                        return 'OpenAI API Key';
                    case ChatMode.GEMINI_2_FLASH:
                        return 'Google Gemini API Key';
                    case ChatMode.CLAUDE_3_5_SONNET:
                    case ChatMode.CLAUDE_3_7_SONNET:
                        return 'Anthropic API Key';
                    case ChatMode.DEEPSEEK_R1:
                    case ChatMode.LLAMA_4_SCOUT:
                        return 'Fireworks API Key';
                    default:
                        return null;
                }
            },
        }),
        {
            name: 'api-keys-storage',
        }
    )
);
