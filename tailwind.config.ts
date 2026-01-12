import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
    darkMode: ['class'],
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                'border-subtle': 'hsl(var(--border-subtle))',
                'border-strong': 'hsl(var(--border-strong))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                surface: {
                    DEFAULT: 'hsl(var(--surface))',
                    foreground: 'hsl(var(--surface-foreground))',
                },
                'surface-hover': {
                    DEFAULT: 'hsl(var(--surface-hover))',
                    foreground: 'hsl(var(--surface-hover-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderWidth: {
                DEFAULT: '0.8px',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                sans: ['"IBM Plex Sans"', ...fontFamily.sans],
            },
            fontSize: {
                xs: ['0.725rem', { lineHeight: '1.2rem', letterSpacing: '0.01em' }],
                sm: ['0.775rem', { lineHeight: '1.3rem', letterSpacing: '0.008em' }],
                base: ['0.875rem', { lineHeight: '1.5rem' }],
                lg: ['0.975rem', { lineHeight: '1.75rem' }],
                xl: ['1.175rem', { lineHeight: '1.95rem' }],
                '2xl': ['1.275rem', { lineHeight: '2.25rem' }],
                '3xl': ['1.375rem', { lineHeight: '2.5rem' }],
                '4xl': ['1.475rem', { lineHeight: '2.75rem' }],
                '5xl': '3.052rem',
            },
            fontWeight: {
                normal: '350',
                medium: '400',
                semibold: '450',
                bold: '500',
                black: '600',
            },
            keyframes: {
                'accordion-expand': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-collapse': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'marquee-left': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(5px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'pop-in': {
                    '0%': { opacity: '0', transform: 'scale(0.96) translateY(10px)' },
                    '70%': { opacity: '1', transform: 'scale(1.01) translateY(-2px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
            },
            animation: {
                'accordion-expand': 'accordion-expand 0.2s ease-out',
                'accordion-collapse': 'accordion-collapse 0.2s ease-out',
                'fade-in-up': 'fade-in-up 10s ease-out forwards',
                'pop-in': 'pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            typography: () => ({
                prosetheme: {
                    css: {
                        '--tw-prose-body': 'hsl(var(--foreground))',
                        '--tw-prose-headings': 'hsl(var(--foreground))',
                        '--tw-prose-lead': 'hsl(var(--muted-foreground))',
                        '--tw-prose-links': 'hsl(var(--primary))',
                        '--tw-prose-bold': 'hsl(var(--foreground))',
                        '--tw-prose-counters': 'hsl(var(--muted-foreground)/0.1)',
                        '--tw-prose-bullets': 'hsl(var(--muted-foreground)/0.1)',
                        '--tw-prose-hr': 'hsl(var(--border))',
                        '--tw-prose-quotes': 'hsl(var(--foreground))',
                        '--tw-prose-quote-borders': 'hsl(var(--border))',
                        '--tw-prose-captions': 'hsl(var(--muted-foreground))',
                        '--tw-prose-code': 'hsl(var(--foreground))',
                        '--tw-prose-pre-code': 'hsl(var(--muted-foreground))',
                        '--tw-prose-pre-bg': 'hsl(var(--muted))',
                        '--tw-prose-th-borders': 'hsl(var(--border))',
                        '--tw-prose-td-borders': 'hsl(var(--border))',

                        // Dark mode values
                        '--tw-prose-invert-body': 'hsl(var(--foreground))',
                        '--tw-prose-invert-headings': 'hsl(var(--foreground))',
                        '--tw-prose-invert-lead': 'hsl(var(--muted-foreground))',
                        '--tw-prose-invert-links': 'hsl(var(--primary))',
                        '--tw-prose-invert-bold': 'hsl(var(--foreground))',
                        '--tw-prose-invert-counters': 'hsl(var(--muted-foreground))',
                        '--tw-prose-invert-bullets': 'hsl(var(--muted-foreground))',
                        '--tw-prose-invert-hr': 'hsl(var(--border))',
                        '--tw-prose-invert-quotes': 'hsl(var(--foreground))',
                        '--tw-prose-invert-quote-borders': 'hsl(var(--border))',
                        '--tw-prose-invert-captions': 'hsl(var(--muted-foreground))',
                        '--tw-prose-invert-code': 'hsl(var(--foreground))',
                        '--tw-prose-invert-pre-code': 'hsl(var(--muted-foreground))',
                        '--tw-prose-invert-pre-bg': 'hsl(var(--muted))',
                        '--tw-prose-invert-th-borders': 'hsl(var(--border))',
                        '--tw-prose-invert-td-borders': 'hsl(var(--border))',
                    },
                },
            }),
            boxShadow: {
                'subtle-xs': 'var(--shadow-subtle-xs)',
                'subtle-sm': 'var(--shadow-subtle-sm)',
            },
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
        require('tailwind-scrollbar-hide'),
    ],
};

export default config;
