'use client';

import { Logo } from '@/common/components';
import { useRootContext } from '@/common/context';
import { useAppStore } from '@/common/store';
import { Badge, Button } from '@/common/ui';
import { IconCommand, IconSearch, IconSettings2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const TopNav = () => {
    const router = useRouter();
    const isSignedIn = false; // Auth removed
    const { setIsCommandSearchOpen } = useRootContext();
    const setIsSettingsOpen = useAppStore(state => state.setIsSettingsOpen);

    return (
        <div className="border-border bg-background fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b px-4">
            <Link href="/chat">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex h-8 cursor-pointer items-center justify-start gap-1.5"
                >
                    <Logo className="text-primary size-5" />
                    <p className="font-clash text-foreground text-lg font-bold tracking-wide">
                        LLMTalk
                    </p>
                </motion.div>
            </Link>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="bordered"
                    rounded="lg"
                    className="text-muted-foreground justify-center px-2"
                    onClick={() => setIsCommandSearchOpen(true)}
                >
                    <IconSearch size={14} strokeWidth={2} />
                    <span className="ml-2">Search</span>
                    <div className="flex-1" />
                    <div className="flex flex-row items-center gap-1">
                        <Badge
                            variant="secondary"
                            className="bg-muted-foreground/10 text-muted-foreground flex size-5 items-center justify-center rounded-md p-0"
                        >
                            <IconCommand size={12} strokeWidth={2} className="shrink-0" />
                        </Badge>
                        <Badge
                            variant="secondary"
                            className="bg-muted-foreground/10 text-muted-foreground flex size-5 items-center justify-center rounded-md p-0"
                        >
                            T
                        </Badge>
                    </div>
                </Button>
                <Button
                    size="sm"
                    variant="bordered"
                    rounded="lg"
                    onClick={() => setIsSettingsOpen(true)}
                >
                    <IconSettings2 size={14} strokeWidth={2} />
                    <span className="ml-2">Settings</span>
                </Button>
                {!isSignedIn && (
                    <Button size="sm" rounded="lg" onClick={() => router.push('/sign-in')}>
                        Log in / Sign up
                    </Button>
                )}
            </div>
        </div>
    );
};
