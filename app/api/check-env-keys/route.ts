import { NextResponse } from 'next/server';

export async function GET() {
    // Check which API keys are available in .env
    const envKeys = {
        OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
        ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
        GEMINI_API_KEY: !!process.env.GEMINI_API_KEY,
        FIREWORKS_API_KEY: !!process.env.FIREWORKS_API_KEY,
        TOGETHER_API_KEY: !!process.env.TOGETHER_API_KEY,
        SERPER_API_KEY: !!process.env.SERPER_API_KEY,
        JINA_API_KEY: !!process.env.JINA_API_KEY,
    };

    return NextResponse.json(envKeys);
}
