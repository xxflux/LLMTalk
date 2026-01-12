'use client';

import { Badge, Button, Input, Textarea, FormLabel, Checkbox, Switch, RadioGroup, RadioGroupItem, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, Kbd, Alert, AlertTitle, AlertDescription, Toast, ToastTitle, ToastDescription, ToastAction, useToast } from '@/common/ui';
import { CodeBlock, TextShimmer } from '@/common/components';
import { Copy, Check, RotateCcw, ChevronDown, Circle, Globe, MoreHorizontal, CornerDownRight, X, Search, Minus, AlertCircle } from 'lucide-react';
import {
    IconCommand, IconPlus, IconSettings2, IconKey, IconMessageCircleFilled, IconSun, IconMoon, IconTrash,
    IconArrowBarLeft, IconArrowBarRight, IconLogout, IconSelector, IconSettings, IconUser, IconHistory, IconChevronRight,
    IconCheck, IconCopy, IconPencil, IconCircleCheckFilled, IconHelpSmall, IconX, IconAlertCircle, IconBook,
    IconCaretDownFilled, IconQuestionMark, IconSquare, IconSearch, IconHelpHexagon, IconMarkdown, IconRefresh,
    IconCornerDownRight, IconAtom, IconChecklist, IconLoader2, IconNorthStar, IconTools, IconBoltFilled,
    IconCodeDots, IconSpiral, IconBrandJavascript, IconBrandPython, IconBrandReact, IconBrandTypescript,
    IconFileFilled, IconJson, IconTerminal, IconArrowUp, IconChevronDown, IconPaperclip, IconPlayerStopFilled,
    IconWorld, IconPhotoPlus, IconExternalLink, IconBulb, IconChartBar, IconMoodSadDizzy
} from '@tabler/icons-react';
import { useState } from 'react';

const DesignSystemPage = () => {
    const [copied, setCopied] = useState<string | null>(null);
    const [animationKeys, setAnimationKeys] = useState<Record<string, number>>({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [settingsTab, setSettingsTab] = useState('personalization');
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { toast } = useToast();

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const replayAnimation = (animationToken: string) => {
        setAnimationKeys(prev => ({
            ...prev,
            [animationToken]: (prev[animationToken] || 0) + 1,
        }));
    };

    const CopyButton = ({ text, id }: { text: string; id: string }) => (
        <button
            onClick={() => copyToClipboard(text, id)}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
        >
            {copied === id ? (
                <>
                    <Check size={14} />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <Copy size={14} />
                    <span>Copy</span>
                </>
            )}
        </button>
    );

    const colors = [
        { name: 'Primary', token: 'primary', class: 'bg-primary', textClass: 'text-primary-foreground' },
        { name: 'Secondary', token: 'secondary', class: 'bg-secondary', textClass: 'text-secondary-foreground' },
        { name: 'Surface', token: 'surface', class: 'bg-surface', textClass: 'text-surface-foreground' },
        { name: 'Surface Hover', token: 'surface-hover', class: 'bg-surface-hover', textClass: 'text-surface-hover-foreground' },
        { name: 'Background', token: 'background', class: 'bg-background', textClass: 'text-foreground' },
        { name: 'Foreground', token: 'foreground', class: 'bg-foreground', textClass: 'text-background' },
        { name: 'Muted', token: 'muted', class: 'bg-muted', textClass: 'text-muted-foreground' },
        { name: 'Accent', token: 'accent', class: 'bg-accent', textClass: 'text-accent-foreground' },
        { name: 'Destructive', token: 'destructive', class: 'bg-destructive', textClass: 'text-destructive-foreground' },
        { name: 'Card', token: 'card', class: 'bg-card', textClass: 'text-card-foreground' },
        { name: 'Popover', token: 'popover', class: 'bg-popover', textClass: 'text-popover-foreground' },
        { name: 'Border', token: 'border', class: 'bg-border', textClass: 'text-foreground' },
        { name: 'Border Subtle', token: 'border-subtle', class: 'bg-border-subtle', textClass: 'text-foreground' },
        { name: 'Border Strong', token: 'border-strong', class: 'bg-border-strong', textClass: 'text-foreground' },
        { name: 'Input', token: 'input', class: 'bg-input', textClass: 'text-foreground' },
        { name: 'Ring', token: 'ring', class: 'bg-ring', textClass: 'text-background' },
    ];

    const fontSizes = [
        { name: 'XS', token: 'text-xs', size: '0.725rem', lineHeight: '1.2rem' },
        { name: 'SM', token: 'text-sm', size: '0.775rem', lineHeight: '1.3rem' },
        { name: 'Base', token: 'text-base', size: '0.875rem', lineHeight: '1.5rem' },
        { name: 'LG', token: 'text-lg', size: '0.975rem', lineHeight: '1.75rem' },
        { name: 'XL', token: 'text-xl', size: '1.175rem', lineHeight: '1.95rem' },
        { name: '2XL', token: 'text-2xl', size: '1.275rem', lineHeight: '2.25rem' },
        { name: '3XL', token: 'text-3xl', size: '1.375rem', lineHeight: '2.5rem' },
        { name: '4XL', token: 'text-4xl', size: '1.475rem', lineHeight: '2.75rem' },
        { name: '5XL', token: 'text-5xl', size: '3.052rem', lineHeight: 'auto' },
    ];

    const fontWeights = [
        { name: 'Normal', token: 'font-normal', weight: '350' },
        { name: 'Medium', token: 'font-medium', weight: '400' },
        { name: 'Semibold', token: 'font-semibold', weight: '450' },
        { name: 'Bold', token: 'font-bold', weight: '500' },
        { name: 'Black', token: 'font-black', weight: '600' },
    ];

    const animations = [
        { name: 'Accordion Expand', token: 'animate-accordion-expand', description: 'Expands accordion content' },
        { name: 'Accordion Collapse', token: 'animate-accordion-collapse', description: 'Collapses accordion content' },
        { name: 'Fade In Up', token: 'animate-fade-in-up', description: 'Fades in with upward movement' },
        { name: 'Pop In', token: 'animate-pop-in', description: 'Pops in with scale and fade' },
    ];

    const shadows = [
        { name: 'Subtle XS', token: 'shadow-subtle-xs', description: 'Extra small subtle shadow' },
        { name: 'Subtle SM', token: 'shadow-subtle-sm', description: 'Small subtle shadow' },
    ];

    const borderRadius = [
        { name: 'SM', token: 'rounded-sm', value: 'calc(var(--radius) - 4px)' },
        { name: 'MD', token: 'rounded-md', value: 'calc(var(--radius) - 2px)' },
        { name: 'LG', token: 'rounded-lg', value: 'var(--radius)' },
    ];

    return (
        <div className="bg-background min-h-screen ml-auto mr-auto">
            <div className="mx-auto max-w-6xl px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-foreground mb-2 text-4xl font-bold">Design System</h1>
                    <p className="text-muted-foreground text-lg">
                        Complete reference for all design tokens, colors, typography, and components.
                    </p>
                </div>

                {/* Typography Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Typography</h2>

                    <div className="mb-8">
                        <h3 className="text-foreground mb-4 text-xl font-semibold">Font Family</h3>
                        <div className="border-border bg-card rounded-lg border p-6">
                            <p className="text-foreground mb-2 font-sans text-lg">
                                IBM Plex Sans
                            </p>
                            <code className="text-muted-foreground text-sm">font-sans</code>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-foreground mb-4 text-xl font-semibold">Font Sizes</h3>
                        <div className="border-border bg-card rounded-lg border p-6">
                            <div className="space-y-4">
                                {fontSizes.map(size => (
                                    <div key={size.token} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="text-foreground font-medium">{size.name}</span>
                                                <code className="text-muted-foreground text-xs">{size.token}</code>
                                                <CopyButton text={size.token} id={`size-${size.token}`} />
                                            </div>
                                            <p className={`text-foreground ${size.token}`}>
                                                The quick brown fox jumps over the lazy dog
                                            </p>
                                        </div>
                                        <div className="text-muted-foreground ml-4 text-xs text-right">
                                            <div>{size.size}</div>
                                            <div>{size.lineHeight}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-foreground mb-4 text-xl font-semibold">Font Weights</h3>
                        <div className="border-border bg-card rounded-lg border p-6">
                            <div className="space-y-3">
                                {fontWeights.map(weight => (
                                    <div key={weight.token} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-foreground font-medium">{weight.name}</span>
                                            <code className="text-muted-foreground text-xs">{weight.token}</code>
                                            <CopyButton text={weight.token} id={`weight-${weight.token}`} />
                                        </div>
                                        <p className={`text-foreground ${weight.token} text-lg`}>
                                            The quick brown fox
                                        </p>
                                        <span className="text-muted-foreground ml-4 text-xs">{weight.weight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Text Gradients Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Text Gradients</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Text gradient effects for creating visually appealing text with gradient colors. Includes animated shimmer effects and static gradients.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Animated Shimmer Effect</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                The TextShimmer component creates an animated gradient that moves across text, perfect for loading states and attention-grabbing text.
                            </p>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-muted/30 border-border rounded-lg border p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <TextShimmer duration={1.5} spread={2}>
                                                    Loading content...
                                                </TextShimmer>
                                            </div>
                                            <div>
                                                <TextShimmer duration={2} spread={1.5}>
                                                    Processing your request
                                                </TextShimmer>
                                            </div>
                                            <div>
                                                <TextShimmer duration={1} spread={3} className="text-2xl font-bold">
                                                    Welcome
                                                </TextShimmer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-6">
                                        <div className="space-y-4">
                                            <div>
                                                <TextShimmer duration={1.5} spread={2}>
                                                    Loading content...
                                                </TextShimmer>
                                            </div>
                                            <div>
                                                <TextShimmer duration={2} spread={1.5}>
                                                    Processing your request
                                                </TextShimmer>
                                            </div>
                                            <div>
                                                <TextShimmer duration={1} spread={3} className="text-2xl font-bold">
                                                    Welcome
                                                </TextShimmer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                The shimmer effect automatically adapts colors: uses foreground color in light mode and primary color in dark mode. The effect may be more subtle in light mode due to the gradient animation.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Static Gradient Text</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Static gradient text using Tailwind's gradient utilities with <code className="bg-muted px-1 rounded">bg-clip-text</code> and <code className="bg-muted px-1 rounded">text-transparent</code>.
                            </p>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-6">
                                        <div className="space-y-4">
                                            <p className="from-muted-foreground/50 via-muted-foreground/40 to-muted-foreground/20 bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent">
                                                Gradient from muted colors
                                            </p>
                                            <p className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent">
                                                Gradient with primary colors
                                            </p>
                                            <p className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                                Bold gradient text
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-6">
                                        <div className="space-y-4">
                                            <p className="from-muted-foreground/50 via-muted-foreground/40 to-muted-foreground/20 bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent">
                                                Gradient from muted colors
                                            </p>
                                            <p className="from-primary via-primary/80 to-primary/60 bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent">
                                                Gradient with primary colors
                                            </p>
                                            <p className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
                                                Bold gradient text
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Usage</h3>
                            <div className="bg-muted rounded-lg p-4 space-y-3 text-sm">
                                <div>
                                    <strong className="text-foreground">TextShimmer Component:</strong>
                                    <div className="text-muted-foreground mt-1">
                                        <code className="bg-background px-1 rounded">import {`{ TextShimmer }`} from '@/common/components'</code>
                                    </div>
                                    <div className="text-muted-foreground mt-2">
                                        <code className="bg-background px-1 rounded">{`<TextShimmer duration={1.5} spread={2}>Loading...</TextShimmer>`}</code>
                                    </div>
                                </div>
                                <div>
                                    <strong className="text-foreground">Static Gradient:</strong>
                                    <div className="text-muted-foreground mt-1">
                                        <code className="bg-background px-1 rounded">className="from-primary via-accent to-primary bg-gradient-to-r bg-clip-text text-transparent"</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Colors Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Colors</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Colors automatically adapt to light and dark modes. Toggle your theme to see the differences.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {colors.map(color => (
                            <div
                                key={color.token}
                                className="border-border bg-card rounded-lg border p-4"
                            >
                                <div className="mb-3 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-foreground font-semibold">{color.name}</h3>
                                        <code className="text-muted-foreground text-xs">{color.token}</code>
                                    </div>
                                    <CopyButton text={`bg-${color.token}`} id={`color-${color.token}`} />
                                </div>
                                <div
                                    className={`${color.class} ${color.textClass} mb-2 flex h-20 items-center justify-center rounded-md border`}
                                >
                                    <span className="text-sm font-medium">Sample</span>
                                </div>
                                <div className="text-muted-foreground text-xs">
                                    <div>Class: <code className="bg-muted px-1 rounded">bg-{color.token}</code></div>
                                    {color.textClass && (
                                        <div className="mt-1">
                                            Text: <code className="bg-muted px-1 rounded">{color.textClass}</code>
                                        </div>
                                    )}
                                    <div className="mt-2 border-border border-t pt-2">
                                        <div className="font-medium">Light/Dark Mode:</div>
                                        <div className="mt-1 text-[10px] opacity-75">
                                            Automatically adapts based on theme
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Dark Mode Examples Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Dark Mode Examples</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            The following examples show how components and colors appear in dark mode. Toggle dark mode in Settings to see live examples.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Color Comparison</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <div className="mb-2 flex gap-2">
                                            <div className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs">Primary</div>
                                            <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">Secondary</div>
                                            <div className="bg-surface text-surface-foreground rounded px-2 py-1 text-xs">Surface</div>
                                        </div>
                                        <div className="text-foreground text-sm">
                                            This is how colors appear in light mode.
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <div className="mb-2 flex gap-2">
                                            <div className="bg-primary text-primary-foreground rounded px-2 py-1 text-xs">Primary</div>
                                            <div className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs">Secondary</div>
                                            <div className="bg-surface text-surface-foreground rounded px-2 py-1 text-xs">Surface</div>
                                        </div>
                                        <div className="text-foreground text-sm">
                                            This is how colors appear in dark mode.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Component Examples</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            <Button variant="primary" size="sm">Primary</Button>
                                            <Button variant="secondary" size="sm">Secondary</Button>
                                            <Button variant="outlined" size="sm">Outlined</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="default">Default</Badge>
                                            <Badge variant="primary">Primary</Badge>
                                            <Badge variant="secondary">Secondary</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            <Button variant="primary" size="sm">Primary</Button>
                                            <Button variant="secondary" size="sm">Secondary</Button>
                                            <Button variant="outlined" size="sm">Outlined</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="default">Default</Badge>
                                            <Badge variant="primary">Primary</Badge>
                                            <Badge variant="secondary">Secondary</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Dark Mode CSS Variables</h3>
                            <div className="bg-muted rounded-lg p-4">
                                <p className="text-muted-foreground mb-2 text-sm">
                                    Dark mode colors are defined in <code className="bg-background px-1 rounded">globals.css</code> under the <code className="bg-background px-1 rounded">.dark</code> class:
                                </p>
                                <pre className="text-muted-foreground overflow-x-auto text-xs">
{`.dark {
  --background: 180 0% 10%;
  --foreground: 180 0% 98%;
  --primary: 14 93% 63%;
  --secondary: 180 0% 8%;
  --surface: 180 0% 6%;
  /* ... and more */
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Animations Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Animations</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {animations.map(animation => (
                            <div
                                key={animation.token}
                                className="border-border bg-card rounded-lg border p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-foreground font-semibold">{animation.name}</h3>
                                        <p className="text-muted-foreground text-sm">{animation.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => replayAnimation(animation.token)}
                                            className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
                                            title="Replay animation"
                                        >
                                            <RotateCcw size={14} />
                                            <span>Replay</span>
                                        </button>
                                        <CopyButton text={animation.token} id={`anim-${animation.token}`} />
                                    </div>
                                </div>
                                <code className="text-muted-foreground text-xs">{animation.token}</code>
                                <div className="mt-4">
                                    <div
                                        key={animationKeys[animation.token] || 0}
                                        className={`bg-primary text-primary-foreground ${animation.token} flex h-20 items-center justify-center rounded-md`}
                                    >
                                        <span className="text-sm">Animation Preview</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Shadows Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Shadows</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {shadows.map(shadow => (
                            <div
                                key={shadow.token}
                                className="border-border bg-card rounded-lg border p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-foreground font-semibold">{shadow.name}</h3>
                                        <p className="text-muted-foreground text-sm">{shadow.description}</p>
                                    </div>
                                    <CopyButton text={shadow.token} id={`shadow-${shadow.token}`} />
                                </div>
                                <code className="text-muted-foreground text-xs">{shadow.token}</code>
                                <div className="mt-4">
                                    <div
                                        className={`bg-background border-border ${shadow.token} flex h-20 items-center justify-center rounded-md border`}
                                    >
                                        <span className="text-sm">Preview</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Border Radius Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Border Radius</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {borderRadius.map(radius => (
                            <div
                                key={radius.token}
                                className="border-border bg-card rounded-lg border p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-foreground font-semibold">{radius.name}</h3>
                                        <p className="text-muted-foreground text-xs">{radius.value}</p>
                                    </div>
                                    <CopyButton text={radius.token} id={`radius-${radius.token}`} />
                                </div>
                                <code className="text-muted-foreground text-xs">{radius.token}</code>
                                <div className="mt-4">
                                    <div
                                        className={`bg-primary text-primary-foreground ${radius.token} flex h-20 items-center justify-center`}
                                    >
                                        <span className="text-sm">Preview</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Forms Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Forms</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Form components for building user interfaces. All components adapt to light and dark modes.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Input Fields</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4 space-y-4">
                                        <div>
                                            <FormLabel label="Email Address" />
                                            <Input type="email" placeholder="Enter your email" className="mt-2" />
                                        </div>
                                        <div>
                                            <FormLabel label="Password" />
                                            <Input type="password" placeholder="Enter your password" className="mt-2" />
                                        </div>
                                        <div>
                                            <FormLabel label="Search" />
                                            <Input type="search" placeholder="Search..." className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4 space-y-4">
                                        <div>
                                            <FormLabel label="Email Address" />
                                            <Input type="email" placeholder="Enter your email" className="mt-2" />
                                        </div>
                                        <div>
                                            <FormLabel label="Password" />
                                            <Input type="password" placeholder="Enter your password" className="mt-2" />
                                        </div>
                                        <div>
                                            <FormLabel label="Search" />
                                            <Input type="search" placeholder="Search..." className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <code className="text-muted-foreground text-xs">Input variants: default, ghost | Sizes: default, sm</code>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Textarea</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <FormLabel label="Message" />
                                        <Textarea placeholder="Enter your message here..." className="mt-2" />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <FormLabel label="Message" />
                                        <Textarea placeholder="Enter your message here..." className="mt-2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Checkbox</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check1" />
                                            <label htmlFor="check1" className="text-sm cursor-pointer">Accept terms and conditions</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check2" defaultChecked />
                                            <label htmlFor="check2" className="text-sm cursor-pointer">Subscribe to newsletter</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check3" disabled />
                                            <label htmlFor="check3" className="text-sm cursor-pointer opacity-50">Disabled option</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check1-dark" />
                                            <label htmlFor="check1-dark" className="text-foreground text-sm cursor-pointer">Accept terms and conditions</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check2-dark" defaultChecked />
                                            <label htmlFor="check2-dark" className="text-foreground text-sm cursor-pointer">Subscribe to newsletter</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="check3-dark" disabled />
                                            <label htmlFor="check3-dark" className="text-foreground text-sm cursor-pointer opacity-50">Disabled option</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Switch</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm">Enable notifications</label>
                                            <Switch />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm">Dark mode</label>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm opacity-50">Disabled option</label>
                                            <Switch disabled />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-foreground text-sm">Enable notifications</label>
                                            <Switch />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-foreground text-sm">Dark mode</label>
                                            <Switch defaultChecked />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-foreground text-sm opacity-50">Disabled option</label>
                                            <Switch disabled />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Radio Group</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <FormLabel label="Select an option" />
                                        <RadioGroup defaultValue="option1" className="mt-2">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option1" id="radio1" />
                                                <label htmlFor="radio1" className="text-sm cursor-pointer">Option 1</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option2" id="radio2" />
                                                <label htmlFor="radio2" className="text-sm cursor-pointer">Option 2</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option3" id="radio3" />
                                                <label htmlFor="radio3" className="text-sm cursor-pointer">Option 3</label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <FormLabel label="Select an option" />
                                        <RadioGroup defaultValue="option1" className="mt-2">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option1" id="radio1-dark" />
                                                <label htmlFor="radio1-dark" className="text-foreground text-sm cursor-pointer">Option 1</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option2" id="radio2-dark" />
                                                <label htmlFor="radio2-dark" className="text-foreground text-sm cursor-pointer">Option 2</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="option3" id="radio3-dark" />
                                                <label htmlFor="radio3-dark" className="text-foreground text-sm cursor-pointer">Option 3</label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Switcher</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Button-based switcher for selecting between multiple options. Commonly used for theme selection, view modes, and similar choices.
                            </p>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4 space-y-4">
                                        <div>
                                            <FormLabel label="Theme Selection" />
                                            <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                                                <Button
                                                    variant={themeMode === 'light' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setThemeMode('light')}
                                                >
                                                    <IconSun size={16} strokeWidth={2} />
                                                    <span className="ml-2">Light</span>
                                                </Button>
                                                <Button
                                                    variant={themeMode === 'dark' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setThemeMode('dark')}
                                                >
                                                    <IconMoon size={16} strokeWidth={2} />
                                                    <span className="ml-2">Dark</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <FormLabel label="View Mode" />
                                            <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                                                <Button
                                                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setViewMode('grid')}
                                                >
                                                    Grid
                                                </Button>
                                                <Button
                                                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setViewMode('list')}
                                                >
                                                    List
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4 space-y-4">
                                        <div>
                                            <FormLabel label="Theme Selection" />
                                            <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                                                <Button
                                                    variant={themeMode === 'light' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setThemeMode('light')}
                                                >
                                                    <IconSun size={16} strokeWidth={2} />
                                                    <span className="ml-2">Light</span>
                                                </Button>
                                                <Button
                                                    variant={themeMode === 'dark' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setThemeMode('dark')}
                                                >
                                                    <IconMoon size={16} strokeWidth={2} />
                                                    <span className="ml-2">Dark</span>
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <FormLabel label="View Mode" />
                                            <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                                                <Button
                                                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setViewMode('grid')}
                                                >
                                                    Grid
                                                </Button>
                                                <Button
                                                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                                    size="sm"
                                                    className="flex-1"
                                                    onClick={() => setViewMode('list')}
                                                >
                                                    List
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Form Label</h3>
                            <div className="bg-background border-border rounded-lg border p-4 space-y-4">
                                <FormLabel label="Required Field" />
                                <FormLabel label="Optional Field" isOptional />
                                <FormLabel 
                                    label="Field with Description" 
                                    link="https://example.com"
                                    linkText="Learn more"
                                >
                                    This is a helpful description for the field.
                                </FormLabel>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Icons Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Icons</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Icon library used in the application. Icons are from <code className="bg-muted px-1 rounded">@tabler/icons-react</code> and <code className="bg-muted px-1 rounded">lucide-react</code>.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Tabler Icons</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                {/* Navigation & UI */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconArrowBarLeft size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ArrowBarLeft</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconArrowBarRight size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ArrowBarRight</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconArrowUp size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ArrowUp</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconChevronDown size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ChevronDown</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconChevronRight size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ChevronRight</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCornerDownRight size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">CornerDownRight</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCaretDownFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">CaretDownFilled</span>
                                </div>
                                
                                {/* Actions */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCheck size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Check</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCopy size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Copy</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconTrash size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Trash</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconRefresh size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Refresh</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconPlus size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Plus</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconX size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">X</span>
                                </div>
                                
                                {/* Settings & Configuration */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSettings size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Settings</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSettings2 size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Settings2</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconKey size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Key</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSun size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Sun</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconMoon size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Moon</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSelector size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Selector</span>
                                </div>
                                
                                {/* Search & Navigation */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSearch size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Search</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCommand size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Command</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconHistory size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">History</span>
                                </div>
                                
                                {/* User & Account */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconUser size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">User</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconLogout size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Logout</span>
                                </div>
                                
                                {/* Messages & Communication */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconMessageCircleFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">MessageCircleFilled</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconQuestionMark size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">QuestionMark</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconHelpHexagon size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">HelpHexagon</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconHelpSmall size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">HelpSmall</span>
                                </div>
                                
                                {/* Status & Feedback */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCircleCheckFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">CircleCheckFilled</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconAlertCircle size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">AlertCircle</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconMoodSadDizzy size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">MoodSadDizzy</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconLoader2 size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Loader2</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconPlayerStopFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">PlayerStopFilled</span>
                                </div>
                                
                                {/* Content & Media */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBook size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Book</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconPencil size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Pencil</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconMarkdown size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Markdown</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconPhotoPlus size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">PhotoPlus</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconPaperclip size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Paperclip</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconExternalLink size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ExternalLink</span>
                                </div>
                                
                                {/* Tools & Features */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconTools size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Tools</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBoltFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">BoltFilled</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconCodeDots size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">CodeDots</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSpiral size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Spiral</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconAtom size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Atom</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconNorthStar size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">NorthStar</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconChecklist size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Checklist</span>
                                </div>
                                
                                {/* Code & Language Icons */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBrandJavascript size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">BrandJavascript</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBrandTypescript size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">BrandTypescript</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBrandReact size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">BrandReact</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBrandPython size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">BrandPython</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconJson size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Json</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconTerminal size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Terminal</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconFileFilled size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">FileFilled</span>
                                </div>
                                
                                {/* Other */}
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconSquare size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Square</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconBulb size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Bulb</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconChartBar size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ChartBar</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <IconWorld size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">World</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Lucide Icons</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <ChevronDown size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">ChevronDown</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <Circle size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Circle</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <Globe size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Globe</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <MoreHorizontal size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">MoreHorizontal</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <CornerDownRight size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">CornerDownRight</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <X size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">X</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <Search size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Search</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <Minus size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Minus</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <AlertCircle size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">AlertCircle</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border bg-background">
                                    <Check size={24} strokeWidth={2} className="text-foreground" />
                                    <span className="text-xs text-muted-foreground">Check</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Code Block Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Code Block</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Syntax-highlighted code blocks with support for multiple languages. Automatically adapts to light and dark modes.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Supported Languages</h3>
                            <div className="text-muted-foreground mb-4 text-sm">
                                <p className="mb-2">The CodeBlock component supports the following languages:</p>
                                <div className="flex flex-wrap gap-2">
                                    {['javascript', 'typescript', 'jsx', 'python', 'bash', 'json', 'yaml', 'markdown', 'sql', 'plaintext'].map(lang => (
                                        <Badge key={lang} variant="secondary">{lang}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Examples</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-2 text-sm font-medium">JavaScript</div>
                                    <CodeBlock
                                        lang="javascript"
                                        code={`function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Variants</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Default Variant</div>
                                    <CodeBlock
                                        lang="typescript"
                                        variant="default"
                                        code={`const defaultVariant = 'default';
console.log(defaultVariant);`}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Secondary Variant</div>
                                    <CodeBlock
                                        lang="typescript"
                                        variant="secondary"
                                        code={`const secondaryVariant = 'secondary';
console.log(secondaryVariant);`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Without Header</h3>
                            <CodeBlock
                                lang="typescript"
                                showHeader={false}
                                code={`// Code block without header
const noHeader = true;
console.log(noHeader);`}
                            />
                        </div>
                    </div>
                </section>

                {/* Modal/Dialog Templates Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Modal Templates</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            Dialog and AlertDialog components for creating modals and confirmation dialogs. All modals automatically adapt to light and dark modes.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Dialog</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Standard dialog component for displaying content in a modal overlay.
                            </p>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="primary">Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent ariaTitle="Example Dialog">
                                    <DialogHeader>
                                        <DialogTitle>Dialog Title</DialogTitle>
                                        <DialogDescription>
                                            This is a dialog description. It provides context about the dialog's purpose.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p className="text-foreground text-sm">
                                            Dialog content goes here. You can add any content including forms, text, or other components.
                                        </p>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={() => setDialogOpen(false)}>
                                            Confirm
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <div className="mt-4">
                                <CodeBlock
                                    lang="typescript"
                                    code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent ariaTitle="Dialog Title">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text.
      </DialogDescription>
    </DialogHeader>
    <div>
      {/* Your content here */}
    </div>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Alert Dialog</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Alert dialog component for confirmation actions and important messages.
                            </p>
                            <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Item</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the item
                                            and remove all associated data.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel onClick={() => setAlertDialogOpen(false)}>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={() => setAlertDialogOpen(false)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <div className="mt-4">
                                <CodeBlock
                                    lang="typescript"
                                    code={`<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Search Modal (Command Dialog)</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Command dialog component for search functionality and quick actions. Typically triggered with keyboard shortcuts.
                            </p>
                            <CommandDialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
                                <div className="flex w-full flex-row items-center gap-2 p-0.5">
                                    <CommandInput placeholder="Search..." className="w-full" />
                                    <div className="flex shrink-0 items-center gap-1 px-2">
                                        <Kbd className="h-5 w-5">
                                            <IconCommand size={12} strokeWidth={2} className="shrink-0" />
                                        </Kbd>
                                        <Kbd className="h-5 w-5">T</Kbd>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="border-border h-[1px] w-full border-b" />
                                </div>
                                <CommandList className="max-h-[420px] overflow-y-auto p-0.5 pt-1.5">
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Actions">
                                        <CommandItem value="new-thread" onSelect={() => setSearchModalOpen(false)}>
                                            <IconPlus size={14} strokeWidth="2" className="text-muted-foreground flex-shrink-0" />
                                            New Thread
                                        </CommandItem>
                                        <CommandItem value="settings" onSelect={() => setSearchModalOpen(false)}>
                                            <IconSettings2 size={14} strokeWidth="2" className="text-muted-foreground flex-shrink-0" />
                                            Open Settings
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandGroup heading="Recent Items">
                                        <CommandItem value="item-1" onSelect={() => setSearchModalOpen(false)}>
                                            <IconMessageCircleFilled size={16} strokeWidth={2} className="text-muted-foreground/50" />
                                            <span className="w-full truncate font-normal">Example Thread 1</span>
                                        </CommandItem>
                                        <CommandItem value="item-2" onSelect={() => setSearchModalOpen(false)}>
                                            <IconMessageCircleFilled size={16} strokeWidth={2} className="text-muted-foreground/50" />
                                            <span className="w-full truncate font-normal">Example Thread 2</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </CommandDialog>
                            <Button variant="primary" onClick={() => setSearchModalOpen(true)} className="mt-4">
                                Open Search Modal
                            </Button>
                            <div className="mt-4">
                                <CodeBlock
                                    lang="typescript"
                                    code={`<CommandDialog open={open} onOpenChange={setOpen}>
  <div className="flex w-full flex-row items-center gap-2 p-0.5">
    <CommandInput placeholder="Search..." className="w-full" />
    <div className="flex shrink-0 items-center gap-1 px-2">
      <Kbd className="h-5 w-5">
        <IconCommand size={12} />
      </Kbd>
      <Kbd className="h-5 w-5">T</Kbd>
    </div>
  </div>
  <div className="w-full">
    <div className="border-border h-[1px] w-full border-b" />
  </div>
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem value="action" onSelect={handleAction}>
        <Icon /> Action Name
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Settings Modal</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Settings modal with sidebar navigation pattern for organizing multiple settings sections.
                            </p>
                            <Dialog open={settingsModalOpen} onOpenChange={setSettingsModalOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="primary">Open Settings</Button>
                                </DialogTrigger>
                                <DialogContent
                                    ariaTitle="Settings"
                                    className="h-full max-h-[600px] !max-w-[760px] overflow-x-hidden rounded-xl p-0"
                                >
                                    <div className="no-scrollbar relative max-w-full overflow-y-auto overflow-x-hidden">
                                        <h3 className="border-border mx-5 border-b py-4 text-lg font-bold">Settings</h3>
                                        <div className="flex flex-row gap-6 p-4">
                                            <div className="flex w-[160px] shrink-0 flex-col gap-1">
                                                <Button
                                                    rounded="full"
                                                    className="justify-start"
                                                    variant={settingsTab === 'personalization' ? 'secondary' : 'ghost'}
                                                    onClick={() => setSettingsTab('personalization')}
                                                >
                                                    <IconSettings2 size={16} strokeWidth={2} className="text-muted-foreground" />
                                                    Customize
                                                </Button>
                                                <Button
                                                    rounded="full"
                                                    className="justify-start"
                                                    variant={settingsTab === 'api-keys' ? 'secondary' : 'ghost'}
                                                    onClick={() => setSettingsTab('api-keys')}
                                                >
                                                    <IconKey size={16} strokeWidth={2} className="text-muted-foreground" />
                                                    API Keys
                                                </Button>
                                            </div>
                                            <div className="flex flex-1 flex-col overflow-hidden px-4">
                                                {settingsTab === 'personalization' && (
                                                    <div className="flex flex-col gap-6 pb-3">
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="text-base font-semibold">Theme</h3>
                                                            <p className="text-muted-foreground text-sm">Choose your preferred theme mode.</p>
                                                            <div className="border-border mt-2 flex flex-row gap-2 rounded-lg border p-1">
                                                                <Button variant="secondary" size="sm" className="flex-1">
                                                                    <IconSun size={16} strokeWidth={2} />
                                                                    <span className="ml-2">Light</span>
                                                                </Button>
                                                                <Button variant="ghost" size="sm" className="flex-1">
                                                                    <IconMoon size={16} strokeWidth={2} />
                                                                    <span className="ml-2">Dark</span>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {settingsTab === 'api-keys' && (
                                                    <div className="flex flex-col gap-6 pb-3">
                                                        <div className="flex flex-col gap-1">
                                                            <h3 className="text-base font-semibold">API Keys</h3>
                                                            <p className="text-muted-foreground text-sm">Manage your API keys for different providers.</p>
                                                            <div className="border-border mt-2 rounded-lg border p-4">
                                                                <FormLabel label="OpenAI API Key" />
                                                                <Input type="password" placeholder="sk-..." className="mt-2" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <div className="mt-4">
                                <CodeBlock
                                    lang="typescript"
                                    code={`<Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>Open Settings</Button>
  </DialogTrigger>
  <DialogContent
    ariaTitle="Settings"
    className="h-full max-h-[600px] !max-w-[760px] p-0"
  >
    <div className="overflow-y-auto">
      <h3 className="border-border mx-5 border-b py-4 text-lg font-bold">
        Settings
      </h3>
      <div className="flex flex-row gap-6 p-4">
        <div className="flex w-[160px] shrink-0 flex-col gap-1">
          {tabs.map(tab => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-1 flex-col px-4">
          {renderTabContent(activeTab)}
        </div>
      </div>
    </div>
  </DialogContent>
</Dialog>`}
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Usage Guidelines</h3>
                            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                                <div>
                                    <strong className="text-foreground">Dialog:</strong>
                                    <ul className="text-muted-foreground ml-4 mt-1 list-disc space-y-1">
                                        <li>Use for displaying forms, content, or multi-step processes</li>
                                        <li>Can be dismissed by clicking outside or pressing Escape</li>
                                        <li>Includes header, description, and footer sections</li>
                                    </ul>
                                </div>
                                <div>
                                    <strong className="text-foreground">Alert Dialog:</strong>
                                    <ul className="text-muted-foreground ml-4 mt-1 list-disc space-y-1">
                                        <li>Use for confirmation actions and critical decisions</li>
                                        <li>Requires explicit user action (cannot be dismissed by clicking outside)</li>
                                        <li>Typically used for destructive actions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Components Section */}
                <section className="mb-16">
                    <h2 className="text-foreground mb-6 text-2xl font-semibold">Components</h2>
                    <div className="mb-4">
                        <p className="text-muted-foreground text-sm">
                            All components automatically adapt to light and dark modes. Toggle dark mode in Settings to see live examples.
                        </p>
                    </div>
                    <div className="border-border bg-card rounded-lg border p-6">
                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Buttons</h3>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="default" size="sm">Default</Button>
                                            <Button variant="primary" size="sm">Primary</Button>
                                            <Button variant="secondary" size="sm">Secondary</Button>
                                            <Button variant="outlined" size="sm">Outlined</Button>
                                            <Button variant="destructive" size="sm">Destructive</Button>
                                            <Button variant="ghost" size="sm">Ghost</Button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="default" size="sm">Default</Button>
                                            <Button variant="primary" size="sm">Primary</Button>
                                            <Button variant="secondary" size="sm">Secondary</Button>
                                            <Button variant="outlined" size="sm">Outlined</Button>
                                            <Button variant="destructive" size="sm">Destructive</Button>
                                            <Button variant="ghost" size="sm">Ghost</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Buttons automatically adapt their colors, borders, and hover states for optimal contrast in both themes.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Badges</h3>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-3">
                                            <Badge variant="default">Default</Badge>
                                            <Badge variant="secondary">Secondary</Badge>
                                            <Badge variant="primary">Primary</Badge>
                                            <Badge variant="destructive">Destructive</Badge>
                                            <Badge variant="outline">Outline</Badge>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-3">
                                            <Badge variant="default">Default</Badge>
                                            <Badge variant="secondary">Secondary</Badge>
                                            <Badge variant="primary">Primary</Badge>
                                            <Badge variant="destructive">Destructive</Badge>
                                            <Badge variant="outline">Outline</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Badges automatically adjust colors for optimal contrast in both themes.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Alerts</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Alert components for displaying inline messages, warnings, and notifications. All variants automatically adapt to light and dark modes.
                            </p>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4 space-y-3">
                                        <Alert variant="default">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Default Alert</AlertTitle>
                                            <AlertDescription>
                                                This is a default alert message for general information.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="success">
                                            <Check size={16} strokeWidth={2} />
                                            <AlertTitle>Success</AlertTitle>
                                            <AlertDescription>
                                                Your action was completed successfully.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="info">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Information</AlertTitle>
                                            <AlertDescription>
                                                Here's some helpful information for you.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="warning">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Warning</AlertTitle>
                                            <AlertDescription>
                                                Please review this before proceeding.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="destructive">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                Something went wrong. Please try again.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4 space-y-3">
                                        <Alert variant="default">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Default Alert</AlertTitle>
                                            <AlertDescription>
                                                This is a default alert message for general information.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="success">
                                            <Check size={16} strokeWidth={2} />
                                            <AlertTitle>Success</AlertTitle>
                                            <AlertDescription>
                                                Your action was completed successfully.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="info">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Information</AlertTitle>
                                            <AlertDescription>
                                                Here's some helpful information for you.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="warning">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Warning</AlertTitle>
                                            <AlertDescription>
                                                Please review this before proceeding.
                                            </AlertDescription>
                                        </Alert>
                                        <Alert variant="destructive">
                                            <AlertCircle size={16} strokeWidth={2} />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>
                                                Something went wrong. Please try again.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Alert variants: <code className="bg-muted px-1 rounded">default</code>, <code className="bg-muted px-1 rounded">success</code>, <code className="bg-muted px-1 rounded">info</code>, <code className="bg-muted px-1 rounded">warning</code>, <code className="bg-muted px-1 rounded">destructive</code>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-foreground mb-4 text-xl font-semibold">Toasts</h3>
                            <p className="text-muted-foreground mb-4 text-sm">
                                Toast notifications for temporary messages that appear and automatically dismiss. Use the buttons below to trigger different toast variants.
                            </p>
                            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <div className="mb-2 text-sm font-medium">Light Mode</div>
                                    <div className="bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Default Toast',
                                                        description: 'This is a default toast notification.',
                                                        variant: 'default',
                                                    });
                                                }}
                                            >
                                                Default Toast
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Error',
                                                        description: 'Something went wrong. Please try again.',
                                                        variant: 'destructive',
                                                    });
                                                }}
                                            >
                                                Error Toast
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Success',
                                                        description: 'Your action was completed successfully.',
                                                        variant: 'default',
                                                    });
                                                }}
                                            >
                                                Success Toast
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Action Required',
                                                        description: 'Please complete this action to continue.',
                                                        variant: 'default',
                                                        action: (
                                                            <ToastAction altText="Open Settings">
                                                                <Button variant="primary" size="sm">
                                                                    Open Settings
                                                                </Button>
                                                            </ToastAction>
                                                        ),
                                                    });
                                                }}
                                            >
                                                Toast with Action
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 text-sm font-medium">Dark Mode</div>
                                    <div className="dark bg-background border-border rounded-lg border p-4">
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant="default"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Default Toast',
                                                        description: 'This is a default toast notification.',
                                                        variant: 'default',
                                                    });
                                                }}
                                            >
                                                Default Toast
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Error',
                                                        description: 'Something went wrong. Please try again.',
                                                        variant: 'destructive',
                                                    });
                                                }}
                                            >
                                                Error Toast
                                            </Button>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Success',
                                                        description: 'Your action was completed successfully.',
                                                        variant: 'default',
                                                    });
                                                }}
                                            >
                                                Success Toast
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => {
                                                    toast({
                                                        title: 'Action Required',
                                                        description: 'Please complete this action to continue.',
                                                        variant: 'default',
                                                        action: (
                                                            <ToastAction altText="Open Settings">
                                                                <Button variant="primary" size="sm">
                                                                    Open Settings
                                                                </Button>
                                                            </ToastAction>
                                                        ),
                                                    });
                                                }}
                                            >
                                                Toast with Action
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-xs">
                                Toast variants: <code className="bg-muted px-1 rounded">default</code>, <code className="bg-muted px-1 rounded">destructive</code>. Toasts automatically dismiss after a delay and can include action buttons.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DesignSystemPage;
