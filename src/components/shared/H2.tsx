import type { ReactNode } from "react";
import React from "react";

export default function H2({ children }: { children: ReactNode }) {
    return (
        <h2 className="from-verivote-turquoise to-verivote-cyan inline-block bg-gradient-to-r bg-clip-text pb-2 pt-1 text-2xl font-bold uppercase text-transparent sm:text-3xl">
            {children}
        </h2>
    );
}
