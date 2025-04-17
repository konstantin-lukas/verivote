"use client";

import { LinearProgress } from "@mui/material";

import useLoadingState from "@/hooks/useLoadingState";

export default function LoadingIndicator() {
    const { isLoading } = useLoadingState();
    if (!isLoading) return null;
    return (
        <div className="desktop:top-header-height fixed z-10 w-full">
            <LinearProgress />
        </div>
    );
}
