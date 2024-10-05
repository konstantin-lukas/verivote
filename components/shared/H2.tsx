import type { ReactNode } from "react";
import React from "react";

export default function H2({ children }: { children: ReactNode }) {
    return (
        <h2
            className="mb-2 inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan
            bg-clip-text text-2xl font-bold uppercase text-transparent sm:text-3xl"
        >
            {children}
        </h2>
    );
}