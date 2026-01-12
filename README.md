[![https://www.youtube.com/watch?v=7zU3zgt9wxc](https://img.youtube.com/vi/7zU3zgt9wxc/0.jpg)](https://www.youtube.com/watch?v=7zU3zgt9wxc)

## About

LLMTalk is a modern chat interface for interacting with multiple Large Language Models (LLMs) including OpenAI, Anthropic, and Google Gemini. The application provides a unified interface for chatting with various AI models, with support for features like web search, image uploads, and custom AI response rules.

## Features

- **Multiple LLM Providers**: Support for OpenAI, Anthropic (Claude), and Google Gemini models
- **Theme Modes**: Light and dark theme support with system preference detection
- **API Key Management**: Choose between "System mode" (uses keys from environment) or "Own mode" (manage keys in settings)
- **Design System**: Comprehensive design system documentation at `/design-system` showcasing all design tokens, components, and patterns
- **Streaming Responses**: Real-time streaming of LLM responses with support for "Thinking" and "Reasoning" tokens
- **Chat History**: Persistent chat history with thread management
- **Custom AI Rules**: Define custom instructions for AI responses
- **Modern UI**: Built with Next.js, TypeScript, Tailwind CSS, and Radix UI components

## Installation

```bash
# Install dependencies
yarn install
```

## Running

```bash
# Development mode
yarn dev
```

The app will be available at `http://localhost:3000`

## Building

```bash
# Build for production
yarn build

# Start production server
yarn start
```

## Environment Variables

Create a `.env.local` file in the root directory and add your API keys. These will be used when "System mode" is selected in Settings:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
GEMINI_API_KEY=your_gemini_key
# Add other API keys as needed
```

**Note**: You can also manage API keys directly in the application Settings under "API Keys" when using "Own mode". The application will prompt you to add required keys if they're missing when starting a chat.

## Design System

Visit `/design-system` to explore the complete design system, including:
- Typography (font family, sizes, weights)
- Colors (with light/dark mode examples)
- Components (Buttons, Badges, Alerts, Toasts, Forms, etc.)
- Animations and keyframes
- Modal templates
- Icons library
- Code blocks

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Zustand
- **AI SDK**: Vercel AI SDK
- **Icons**: Tabler Icons, Lucide React
- **Font**: IBM Plex Sans
