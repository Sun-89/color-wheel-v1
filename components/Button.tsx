// components/Button.tsx
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={
                props.className ??
                "px-5 py-2 rounded-lg bg-primary hover:bg-primary-light text-white font-medium shadow-soft transition-all"
            }
        >
            {children}
        </button>
    );
}
