import { RootLayout } from '@/common/components';
import { ReactQueryProvider, RootProvider } from '@/common/context';
import { TooltipProvider } from '@/common/ui';
import { ThemeProvider } from 'next-themes';

import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-sans/700.css';

import '../public/assets/globals.css';

export default function ParentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
