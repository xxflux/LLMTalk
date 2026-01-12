'use client';
import { useMcpToolsStore } from '@/common/store';
import { Alert, AlertDescription, DialogFooter } from '@/common/ui';
import { Button } from '@/common/ui/button-component';
import { IconKey, IconMoon, IconSettings2, IconSun, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import { Badge, Dialog, DialogContent, Input } from '@/common/ui';

import { useChatEditor } from '@/common/hooks';
import moment from 'moment';
import { useState } from 'react';
import { ApiKeys, useApiKeysStore } from '../store/api-keys-zustand-store';
import { SETTING_TABS, useAppStore } from '../store/app-zustand-store';
import { useChatStore } from '../store/chat-zustand-store';
import { ChatEditor } from './chat-input';
import { BYOKIcon, ToolIcon } from './icons-component';

export const SettingsModal = () => {
    const isSettingOpen = useAppStore(state => state.isSettingsOpen);
    const setIsSettingOpen = useAppStore(state => state.setIsSettingsOpen);
    const settingTab = useAppStore(state => state.settingTab);
    const setSettingTab = useAppStore(state => state.setSettingTab);

    const settingMenu = [
        {
            icon: <IconSettings2 size={16} strokeWidth={2} className="text-muted-foreground" />,
            title: 'Customize',
            key: SETTING_TABS.PERSONALIZATION,
            component: <PersonalizationSettings />,
        },
        {
            icon: <IconKey size={16} strokeWidth={2} className="text-muted-foreground" />,
            title: 'API Keys',
            key: SETTING_TABS.API_KEYS,
            component: <ApiKeySettings />,
        },
        // {
        //     title: 'MCP Tools',
        //     key: SETTING_TABS.MCP_TOOLS,
        //     component: <MCPSettings />,
        // },
    ];

    return (
        <Dialog open={isSettingOpen} onOpenChange={() => setIsSettingOpen(false)}>
            <DialogContent
                ariaTitle="Settings"
                className="h-full max-h-[600px] !max-w-[760px] overflow-x-hidden rounded-xl p-0"
            >
                <div className="no-scrollbar relative max-w-full overflow-y-auto overflow-x-hidden">
                    <h3 className="border-border mx-5 border-b py-4 text-lg font-bold">Settings</h3>
                    <div className="flex flex-row gap-6 p-4">
                        <div className="flex w-[160px] shrink-0 flex-col gap-1">
                            {settingMenu.map(setting => (
                                <Button
                                    key={setting.key}
                                    rounded="full"
                                    className="justify-start"
                                    variant={settingTab === setting.key ? 'secondary' : 'ghost'}
                                    onClick={() => setSettingTab(setting.key)}
                                >
                                    {setting.icon}
                                    {setting.title}
                                </Button>
                            ))}
                        </div>
                        <div className="flex flex-1 flex-col overflow-hidden px-4">
                            {settingMenu.find(setting => setting.key === settingTab)?.component}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export const MCPSettings = () => {
    const [isAddToolDialogOpen, setIsAddToolDialogOpen] = useState(false);
    const { mcpConfig, addMcpConfig, removeMcpConfig, updateSelectedMCP, selectedMCP } =
        useMcpToolsStore();

    return (
        <div className="flex w-full flex-col gap-6 overflow-x-hidden">
            <div className="flex flex-col">
                <h2 className="flex items-center gap-1 text-base font-medium">MCP Tools</h2>
                <p className="text-muted-foreground text-xs">
                    Connect your MCP tools. This will only work with your own API keys.
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-muted-foreground text-xs font-medium">
                    Connected Tools{' '}
                    <Badge
                        variant="secondary"
                        className="text-primary inline-flex items-center gap-1 rounded-full bg-transparent"
                    >
                        <span className="bg-primary inline-block size-2 rounded-full"></span>
                        {mcpConfig && Object.keys(mcpConfig).length} Connected
                    </Badge>
                </p>
                {mcpConfig &&
                    Object.keys(mcpConfig).length > 0 &&
                    Object.keys(mcpConfig).map(key => (
                        <div
                            key={key}
                            className="bg-secondary divide-border border-border flex h-12 w-full flex-1 flex-row items-center gap-2 divide-x-2 rounded-lg border px-2.5 py-2"
                        >
                            <div className="flex w-full flex-row items-center gap-2">
                                <ToolIcon /> <Badge>{key}</Badge>
                                <p className="text-muted-foreground line-clamp-1 flex-1 text-sm">
                                    {mcpConfig[key]}
                                </p>
                                <Button
                                    size="xs"
                                    variant="ghost"
                                    tooltip="Delete Tool"
                                    onClick={() => {
                                        removeMcpConfig(key);
                                    }}
                                >
                                    <IconTrash
                                        size={14}
                                        strokeWidth={2}
                                        className="text-muted-foreground"
                                    />
                                </Button>
                            </div>
                        </div>
                    ))}

                <Button
                    size="sm"
                    rounded="full"
                    className="mt-2 self-start"
                    onClick={() => setIsAddToolDialogOpen(true)}
                >
                    Add Tool
                </Button>
            </div>

            <div className="mt-6 border-t border-dashed pt-6">
                <p className="text-muted-foreground text-xs">Learn more about MCP:</p>
                <div className="mt-2 flex flex-col gap-2 text-sm">
                    <a
                        href="https://mcp.composio.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center hover:underline"
                    >
                        Browse Composio MCP Directory →
                    </a>
                    <a
                        href="https://www.anthropic.com/news/model-context-protocol"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary inline-flex items-center hover:underline"
                    >
                        Read MCP Documentation →
                    </a>
                </div>
            </div>

            <AddToolDialog
                isOpen={isAddToolDialogOpen}
                onOpenChange={setIsAddToolDialogOpen}
                onAddTool={addMcpConfig}
            />
        </div>
    );
};

type AddToolDialogProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAddTool: (tool: Record<string, string>) => void;
};

const AddToolDialog = ({ isOpen, onOpenChange, onAddTool }: AddToolDialogProps) => {
    const [mcpToolName, setMcpToolName] = useState('');
    const [mcpToolUrl, setMcpToolUrl] = useState('');
    const [error, setError] = useState('');
    const { mcpConfig } = useMcpToolsStore();

    const handleAddTool = () => {
        // Validate inputs
        if (!mcpToolName.trim()) {
            setError('Tool name is required');
            return;
        }

        if (!mcpToolUrl.trim()) {
            setError('Tool URL is required');
            return;
        }

        // Check for duplicate names
        if (mcpConfig && mcpConfig[mcpToolName]) {
            setError('A tool with this name already exists');
            return;
        }

        // Clear error if any
        setError('');

        // Add the tool
        onAddTool({
            [mcpToolName]: mcpToolUrl,
        });

        // Reset form and close dialog
        setMcpToolName('');
        setMcpToolUrl('');
        onOpenChange(false);
    };

    // Reset error when dialog opens/closes
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setError('');
            setMcpToolName('');
            setMcpToolUrl('');
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent ariaTitle="Add MCP Tool" className="!max-w-md">
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold">Add New MCP Tool</h3>

                    {error && <p className="text-destructive text-sm font-medium">{error}</p>}

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Tool Name</label>
                        <Input
                            placeholder="Tool Name"
                            value={mcpToolName}
                            onChange={e => {
                                const key = e.target.value?.trim().toLowerCase().replace(/ /g, '-');
                                setMcpToolName(key);
                                // Clear error when user types
                                if (error) setError('');
                            }}
                        />
                        <p className="text-muted-foreground text-xs">
                            Will be automatically converted to lowercase with hyphens
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Tool Server URL</label>
                        <Input
                            placeholder="https://your-mcp-server.com"
                            value={mcpToolUrl}
                            onChange={e => {
                                setMcpToolUrl(e.target.value);
                                // Clear error when user types
                                if (error) setError('');
                            }}
                        />
                        <p className="text-muted-foreground text-xs">
                            Example: https://your-mcp-server.com
                        </p>
                    </div>
                </div>
                <DialogFooter className="border-border mt-4 border-t pt-4">
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="bordered"
                            rounded={'full'}
                            onClick={() => handleOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleAddTool} rounded="full">
                            Add Tool
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export const ApiKeySettings = () => {
    const apiKeys = useApiKeysStore(state => state.getAllKeys());
    const setApiKey = useApiKeysStore(state => state.setKey);
    const mode = useApiKeysStore(state => state.mode);
    const setMode = useApiKeysStore(state => state.setMode);
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const apiKeyList = [
        {
            name: 'OpenAI',
            key: 'OPENAI_API_KEY' as keyof ApiKeys,
            value: apiKeys.OPENAI_API_KEY,
            url: 'https://platform.openai.com/api-keys',
        },
        {
            name: 'Anthropic',
            key: 'ANTHROPIC_API_KEY' as keyof ApiKeys,
            value: apiKeys.ANTHROPIC_API_KEY,
            url: 'https://console.anthropic.com/settings/keys',
        },
        {
            name: 'Google Gemini',
            key: 'GEMINI_API_KEY' as keyof ApiKeys,
            value: apiKeys.GEMINI_API_KEY,
            url: 'https://ai.google.dev/api',
        },
    ];

    const validateApiKey = (apiKey: string, provider: string) => {
        // Validation logic will be implemented later
        console.log(`Validating ${provider} API key: ${apiKey}`);
        return true;
    };

    const handleSave = (keyName: keyof ApiKeys, value: string) => {
        setApiKey(keyName, value);
        setIsEditing(null);
    };

    const getMaskedKey = (key: string) => {
        if (!key) return '';
        return '****************' + key.slice(-4);
    };

    return (
        <div className="flex flex-col gap-6">


            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">API Key Mode</h3>
                <p className="text-muted-foreground text-sm">Choose your preferred API key source.</p>
                <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                    <Button
                        variant={mode === 'own' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setMode('own')}
                    >
                        <span>Own</span>
                    </Button>
                    <Button
                        variant={mode === 'system' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setMode('system')}
                    >
                        <span>System</span>
                    </Button>
                </div>
            </div>

            {apiKeyList.map(apiKey => (
                <div key={apiKey.key} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{apiKey.name} API Key:</span>
                        <a
                            href={apiKey.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 underline-offset-2 hover:underline"
                        >
                            (Get API key here)
                        </a>
                    </div>

                    <div className="flex items-center gap-2">
                        {mode === 'system' ? (
                            <div className="flex flex-1 items-center gap-2 rounded-md border px-3 py-1.5 bg-muted/50">
                                <span className="text-muted-foreground flex-1 text-sm">
                                    Using .env file (server-side)
                                </span>
                            </div>
                        ) : isEditing === apiKey.key ? (
                            <>
                                <div className="flex-1">
                                    <Input
                                        value={apiKey.value || ''}
                                        placeholder={`Enter ${apiKey.name} API key`}
                                        onChange={e => setApiKey(apiKey.key, e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleSave(apiKey.key, apiKey.value || '')}
                                >
                                    <span className="flex items-center gap-1">✓ Save</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-1 items-center gap-2 rounded-md border px-3 py-1.5">
                                    {apiKey.value ? (
                                        <span className="flex-1">{getMaskedKey(apiKey.value)}</span>
                                    ) : (
                                        <span className="text-muted-foreground flex-1 text-sm">
                                            No API key set
                                        </span>
                                    )}
                                </div>
                                <Button
                                    variant={'bordered'}
                                    size="sm"
                                    onClick={() => setIsEditing(apiKey.key)}
                                >
                                    {apiKey.value ? 'Change Key' : 'Add Key'}
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


const MAX_CHAR_LIMIT = 6000;

export const PersonalizationSettings = () => {
    const customInstructions = useChatStore(state => state.customInstructions);
    const setCustomInstructions = useChatStore(state => state.setCustomInstructions);
    const { theme, setTheme } = useTheme();
    const { editor } = useChatEditor({
        charLimit: MAX_CHAR_LIMIT,
        defaultContent: customInstructions,
        placeholder: 'Enter your custom instructions',
        enableEnter: true,
        onUpdate(props) {
            setCustomInstructions(props.editor.getText());
        },
    });
    return (
        <div className="flex flex-col gap-6 pb-3">
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">Theme</h3>
                <p className="text-muted-foreground text-sm">Choose your preferred theme mode.</p>
                <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                    <Button
                        variant={theme === 'light' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setTheme('light')}
                    >
                        <IconSun size={16} strokeWidth={2} />
                        <span className="ml-2">Light</span>
                    </Button>
                    <Button
                        variant={theme === 'dark' ? 'secondary' : 'ghost'}
                        size="sm"
                        className="flex-1"
                        onClick={() => setTheme('dark')}
                    >
                        <IconMoon size={16} strokeWidth={2} />
                        <span className="ml-2">Dark</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-semibold">AI Response Rules</h3>
                <p className="text-muted-foreground text-sm">
                    Set persistent rules that will be applied to every conversation. These instructions are automatically added to the system prompt for all messages, allowing you to customize the AI's behavior, tone, style, and focus consistently across all chats.
                </p>
                <Alert variant="info" className="mt-2">
                    <AlertDescription className="text-muted-foreground/70 text-xs leading-tight">
                        <strong>Examples:</strong> "Always respond in a friendly, casual tone", "Explain technical concepts in simple terms", "Focus on security best practices when discussing code", "Never use markdown formatting"
                    </AlertDescription>
                </Alert>
                <div className=" shadow-subtle-sm border-border mt-2 rounded-lg border p-3">
                    <ChatEditor editor={editor} />
                </div>
            </div>
            <div className="border-border mt-4 border-t pt-4">
                <Link
                    href="/design-system"
                    target="_blank"
                    className="text-primary hover:text-primary/80 text-sm font-medium underline underline-offset-2"
                >
                    View Design System →
                </Link>
                <p className="text-muted-foreground mt-1 text-xs">
                    Explore all design tokens, colors, typography, and components.
                </p>
            </div>
        </div>
    );
};
