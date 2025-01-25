import type { ReactNode } from "react";
import React from "react";

export default function H2({ children }: { children: ReactNode }) {
    return <h3 className="mb-2 mt-8 block text-xl font-bold uppercase sm:text-2xl">{children}</h3>;
}
