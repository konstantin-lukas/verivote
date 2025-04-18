"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { LoadingStateContext } from "@/contexts";

export default function LoadingStateProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    return <LoadingStateContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingStateContext.Provider>;
}
