export default function SignInPage() {
    return (
        <div className="bg-secondary/95 fixed inset-0 z-[100] flex h-full w-full flex-col items-center justify-center gap-2 backdrop-blur-sm">
            <div className="bg-background border-border flex flex-col items-center gap-4 rounded-lg border p-8 shadow-lg">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-muted-foreground text-center">
                    Authentication is currently disabled.
                    <br />
                    You can use the chat without signing in.
                </p>
                <a
                    href="/chat"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium transition-colors"
                >
                    Go to Chat
                </a>
            </div>
        </div>
    );
}
