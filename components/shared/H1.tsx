import type { CSSProperties, ReactNode } from "react";
import React from "react";

export default function H1({ children, style }: { children: ReactNode, style?: CSSProperties }) {
    return (
        <h1
            className="mb-2 inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan
            bg-clip-text text-4xl font-bold uppercase text-transparent sm:text-5xl md:text-6xl"
            style={style}
        >
            {children}
        </h1>
    );
}