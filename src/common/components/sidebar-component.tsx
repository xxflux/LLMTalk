'use client';
// Auth removed
import { FullPageLoader, HistoryItem } from '@/common/components';
import { useRootContext } from '@/common/context';
import { useAppStore, useChatStore } from '@/common/store';
import { Thread } from '@/shared/types';
import {
    Badge,
    Button,
    cn,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Flex,
} from '@/common/ui';
import {
    IconArrowBarLeft,
    IconArrowBarRight,
    IconCommand,
    IconLogout,
    IconPalette,
    IconPlus,
    IconSelector,
    IconSettings,
    IconUser,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import moment from 'moment';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

export const Sidebar = () => {
    const { threadId: currentThreadId } = useParams();
    const pathname = usePathname();
    const isChatPage = pathname === '/chat';
    const threads = useChatStore(state => state.threads);
    const sortThreads = (threads: Thread[], sortBy: 'createdAt') => {
        return [...threads].sort((a, b) => moment(b[sortBy]).diff(moment(a[sortBy])));
    };

    const isSignedIn = false; // Auth removed
    const user = null; // Auth removed
    const clearAllThreads = useChatStore(state => state.clearAllThreads);
    const setIsSidebarOpen = useAppStore(state => state.setIsSidebarOpen);
    const isSidebarOpen = useAppStore(state => state.isSidebarOpen);
    const setIsSettingsOpen = useAppStore(state => state.setIsSettingsOpen);
    const { push } = useRouter();
    const groupedThreads: Record<string, Thread[]> = {
        today: [],
        yesterday: [],
        last7Days: [],
        last30Days: [],
        previousMonths: [],
    };

    sortThreads(threads, 'createdAt')?.forEach(thread => {
        const createdAt = moment(thread.createdAt);
        const now = moment();

        if (createdAt.isSame(now, 'day')) {
            groupedThreads.today.push(thread);
        } else if (createdAt.isSame(now.clone().subtract(1, 'day'), 'day')) {
            groupedThreads.yesterday.push(thread);
        } else if (createdAt.isAfter(now.clone().subtract(7, 'days'))) {
            groupedThreads.last7Days.push(thread);
        } else if (createdAt.isAfter(now.clone().subtract(30, 'days'))) {
            groupedThreads.last30Days.push(thread);
        } else {
            groupedThreads.previousMonths.push(thread);
        }

        //TODO: Paginate these threads
    });

    const renderGroup = ({
        title,
        threads,

        groupIcon,
        renderEmptyState,
    }: {
        title: string;
        threads: Thread[];
        groupIcon?: React.ReactNode;
        renderEmptyState?: () => React.ReactNode;
    }) => {
        if (threads.length === 0 && !renderEmptyState) return null;
        return (
            <Flex direction="col" items="start" className="w-full gap-0.5">
                <div className="text-muted-foreground/70 flex flex-row items-center gap-1 px-2 py-1 text-xs font-medium opacity-70">
                    {groupIcon}
                    {title}
                </div>
                {threads.length === 0 && renderEmptyState ? (
                    renderEmptyState()
                ) : (
                    <Flex className="border-border/50 w-full gap-0.5" gap="none" direction="col">
                        {threads.map(thread => (
                            <HistoryItem
                                thread={thread}
                                key={thread.id}
                                dismiss={() => {
                                    setIsSidebarOpen(prev => false);
                                }}
                                isActive={thread.id === currentThreadId}
                            />
                        ))}
                    </Flex>
                )}
            </Flex>
        );
    };

    return (
        <div
            className={cn(
                'relative bottom-0 left-0 top-0 z-[50] flex h-[100dvh] flex-shrink-0 flex-col  py-2 transition-all duration-200',
                isSidebarOpen ? 'top-0 h-full w-[230px]' : 'w-[50px]'
            )}
        >
            <Flex direction="col" className="w-full flex-1 items-start overflow-hidden">
                <div className="mb-3 flex w-full flex-row items-center justify-start">
                    {isSidebarOpen ? (
                        <Button
                            variant="ghost"
                            tooltip="Close Sidebar"
                            tooltipSide="right"
                            size="icon-sm"
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                            className="ml-3"
                        >
                            <IconArrowBarLeft size={16} strokeWidth={2} />
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            tooltip="Open Sidebar"
                            tooltipSide="right"
                            size="icon-sm"
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                            className="ml-3"
                        >
                            <IconArrowBarRight size={16} strokeWidth={2} />
                        </Button>
                    )}
                </div>
                <Flex
                    direction="col"
                    className={cn(
                        'w-full items-end px-3 ',
                        !isSidebarOpen && 'items-center justify-center px-0'
                    )}
                    gap="xs"
                >
                    {!isChatPage ? (
                        <Link href="/chat" className={isSidebarOpen ? 'w-full' : ''}>
                            <Button
                                size={isSidebarOpen ? 'sm' : 'icon-sm'}
                                variant="bordered"
                                rounded="lg"
                                tooltip={isSidebarOpen ? undefined : 'New Thread'}
                                tooltipSide="right"
                                className={cn(isSidebarOpen && 'relative w-full', 'justify-center')}
                            >
                                <IconPlus size={16} strokeWidth={2} className={cn(isSidebarOpen)} />
                                {isSidebarOpen && 'New'}
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            size={isSidebarOpen ? 'sm' : 'icon-sm'}
                            variant="bordered"
                            rounded="lg"
                            tooltip={isSidebarOpen ? undefined : 'New Thread'}
                            tooltipSide="right"
                            className={cn(isSidebarOpen && 'relative w-full', 'justify-center')}
                        >
                            <IconPlus size={16} strokeWidth={2} className={cn(isSidebarOpen)} />
                            {isSidebarOpen && 'New Thread'}
                        </Button>
                    )}
                </Flex>
                <Flex
                    direction="col"
                    gap="xs"
                    className={cn(
                        'border-border-strong mt-3 w-full  justify-center border-t border-dashed px-3 py-2',
                        !isSidebarOpen && 'items-center justify-center px-0'
                    )}
                >
                    {/* <Link href="/recent" className={isSidebarOpen ? 'w-full' : ''}>
                        <Button
                            size={isSidebarOpen ? 'xs' : 'icon-sm'}
                            variant="bordered"
                            rounded="lg"
                            tooltip={isSidebarOpen ? undefined : 'Recent'}
                            tooltipSide="right"
                            className={cn(
                                'text-muted-foreground w-full justify-start',
                                !isSidebarOpen && 'w-auto justify-center'
                            )}
                        >
                            <IconHistory size={14} strokeWidth={2} />
                            {isSidebarOpen && 'Recent'}
                            {isSidebarOpen && <span className="inline-flex flex-1" />}
                            {isSidebarOpen && <IconChevronRight size={14} strokeWidth={2} />}
                        </Button>
                    </Link> */}
                </Flex>

                {false ? (
                    <FullPageLoader />
                ) : (
                    <Flex
                        direction="col"
                        gap="md"
                        className={cn(
                            'no-scrollbar w-full flex-1 overflow-y-auto px-3 pb-[100px]',
                            isSidebarOpen ? 'flex' : 'hidden'
                        )}
                    >
                        {renderGroup({ title: 'Today', threads: groupedThreads.today })}
                        {renderGroup({ title: 'Yesterday', threads: groupedThreads.yesterday })}
                        {renderGroup({ title: 'Last 7 Days', threads: groupedThreads.last7Days })}
                        {renderGroup({ title: 'Last 30 Days', threads: groupedThreads.last30Days })}
                        {renderGroup({
                            title: 'Previous Months',
                            threads: groupedThreads.previousMonths,
                        })}
                    </Flex>
                )}

                <Flex
                    className={cn(
                        'from-surface via-surface/95 absolute bottom-0 mt-auto w-full items-center bg-gradient-to-t via-60% to-transparent p-2 pt-12',
                        isSidebarOpen && 'items-start justify-between'
                    )}
                    gap="xs"
                    direction={'col'}
                >
                    {!isSidebarOpen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            tooltip="Open Sidebar"
                            tooltipSide="right"
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                            className={cn(!isSidebarOpen && 'mx-auto')}
                        >
                            <IconArrowBarRight size={16} strokeWidth={2} />
                        </Button>
                    )}
                    <Link href="/design-system" className={isSidebarOpen ? 'w-full' : ''}>
                        <Button
                            size={isSidebarOpen ? 'sm' : 'icon-sm'}
                            variant="bordered"
                            rounded="lg"
                            tooltip={isSidebarOpen ? undefined : 'Design System'}
                            tooltipSide="right"
                            className={cn(
                                'text-muted-foreground w-full justify-start',
                                !isSidebarOpen && 'w-auto justify-center'
                            )}
                        >
                            <IconPalette size={16} strokeWidth={2} />
                            {isSidebarOpen && 'Design System'}
                        </Button>
                    </Link>
                    {isSignedIn && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div
                                    className={cn(
                                        'hover:bg-surface-hover bg-background shadow-subtle-xs flex w-full cursor-pointer flex-row items-center gap-3 rounded-lg px-2 py-1.5',
                                        !isSidebarOpen && 'px-1.5'
                                    )}
                                >
                                    <div className="bg-primary flex size-5 shrink-0 items-center justify-center rounded-full">
                                        {user && user.hasImage ? (
                                            <img
                                                src={user?.imageUrl ?? ''}
                                                width={0}
                                                height={0}
                                                className="size-full shrink-0 rounded-full"
                                                alt={user?.fullName ?? ''}
                                            />
                                        ) : (
                                            <IconUser
                                                size={14}
                                                strokeWidth={2}
                                                className="text-background"
                                            />
                                        )}
                                    </div>

                                    {isSidebarOpen && (
                                        <p className="line-clamp-1 flex-1 !text-sm font-medium">
                                            {user?.fullName}
                                        </p>
                                    )}
                                    {isSidebarOpen && (
                                        <IconSelector
                                            size={14}
                                            strokeWidth={2}
                                            className="text-muted-foreground"
                                        />
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                                    <IconSettings size={16} strokeWidth={2} />
                                    Settings
                                </DropdownMenuItem>
                                {/* {!isSignedIn && (
                                <DropdownMenuItem onClick={() => push('/sign-in')}>
                                    <IconUser size={16} strokeWidth={2} />
                                    Log in
                                </DropdownMenuItem>
                            )} */}
                                {isSignedIn && (
                                    <DropdownMenuItem onClick={() => openUserProfile()}>
                                        <IconUser size={16} strokeWidth={2} />
                                        Profile
                                    </DropdownMenuItem>
                                )}
                                {isSignedIn && (
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <IconLogout size={16} strokeWidth={2} />
                                        Logout
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </Flex>
            </Flex>
        </div>
    );
};
