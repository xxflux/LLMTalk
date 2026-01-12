import * as React from 'react';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
}

export const Logo = ({ className, ...props }: LogoProps) => (
    <img
        src="/assets/favicon.ico"
        alt="LLMTalk Logo"
        className={className}
        {...props}
    />
);

export const DarkLogo = ({ className, ...props }: LogoProps) => (
    <img
        src="/assets/favicon.ico"
        alt="LLMTalk Logo"
        className={className}
        {...props}
    />
);
