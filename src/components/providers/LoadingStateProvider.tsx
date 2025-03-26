"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { LoadingStateContext } from "@/contexts";

export default function LoadingStateProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams]);
    return <LoadingStateContext.Provider value={[isLoading, setIsLoading]}>{children}</LoadingStateContext.Provider>;
}
