import type { ReactNode } from "react";
import React from "react";

export default function H1({
    children,
    className,
    customSizes,
}: {
    children: ReactNode;
    className?: string;
    customSizes?: string;
}) {
    const sizes = customSizes ?? "text-4xl sm:text-5xl md:text-6xl";
    return (
        <h1
            className={`from-verivote-turquoise to-verivote-cyan inline-block bg-gradient-to-r bg-clip-text pb-2 pt-1 font-bold uppercase text-transparent ${className ?? ""} ${sizes}`}
        >
            {children}
        </h1>
    );
}
