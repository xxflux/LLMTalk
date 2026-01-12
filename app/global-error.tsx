'use client';

import Error from 'next/error';

export default function GlobalError({ error }: { error: Error }) {
    return (
        <html>
            <body>
                <div className="flex h-screen w-screen flex-col items-center justify-center bg-emerald-50">
                    <div className="flex w-[300px] flex-col gap-2">
                        <p className="text-base">Oops! Something went wrong.</p>
                        <p className="text-primary text-sm">
                            
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}
