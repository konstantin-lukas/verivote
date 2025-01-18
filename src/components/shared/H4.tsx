import type { ReactNode } from "react";
import React from "react";

export default function H2({ children }: { children: ReactNode }) {
    return (
        <h4 className="mb-2 mt-4 block text-lg font-bold uppercase sm:text-xl">
            {children}
        </h4>
    );
}
