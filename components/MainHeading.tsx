import type { ReactNode } from "react";
import React from "react";

export default function MainHeading({ children }: { children: ReactNode }) {
    return (
        <h1
            className="mb-2 inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan
            bg-clip-text text-4xl font-bold uppercase text-transparent"
        >
            {children}
        </h1>
    );
}