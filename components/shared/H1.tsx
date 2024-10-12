import type { ReactNode } from "react";
import React from "react";

export default function H1({ children, className, customSizes }: { children: ReactNode, className?: string, customSizes?: string }) {
    const sizes = customSizes ?? "text-4xl sm:text-5xl md:text-6xl";
    return (
        <h1
            className={`mb-2 inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan
                bg-clip-text font-bold uppercase text-transparent ${className ?? ""} ${sizes}`}
        >
            {children}
        </h1>
    );
}