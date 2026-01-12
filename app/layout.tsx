import { RootLayout } from '@/common/components';
import { ReactQueryProvider, RootProvider } from '@/common/context';
import { TooltipProvider } from '@/common/ui';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import '../public/assets/globals.css';

export const metadata: Metadata = {
    icons: {
        icon: '/assets/favicon.ico',
    },
};

export default function ParentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="light" themes={['light', 'dark']}>
                    <RootProvider>
                        <TooltipProvider>
                            <ReactQueryProvider>
                                <RootLayout>{children}</RootLayout>
                            </ReactQueryProvider>
                        </TooltipProvider>
                    </RootProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
