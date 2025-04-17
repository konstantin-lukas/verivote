"use client";

import { LinearProgress } from "@mui/material";
import { useContext } from "react";

import { LoadingStateContext } from "@/contexts";

export default function LoadingIndicator() {
    const { isLoading } = useContext(LoadingStateContext);
    if (!isLoading) return null;
    return (
        <div className="desktop:top-header-height fixed z-10 w-full">
            <LinearProgress />
        </div>
    );
}
