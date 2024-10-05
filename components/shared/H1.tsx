import type { ReactNode } from "react";
import React from "react";

export default function H1({ children }: { children: ReactNode }) {
    return (
        <h1
            className="mb-2 inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan
            bg-clip-text text-3xl font-bold uppercase text-transparent sm:text-4xl"
        >
            {children}
        </h1>
    );
}