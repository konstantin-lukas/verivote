"use client";

import { LinearProgress } from "@mui/material";
import { useContext } from "react";

import { LoadingStateContext } from "@/contexts";

export default function LoadingIndicator() {
    const [isLoading] = useContext(LoadingStateContext);
    if (!isLoading) return null;
    return (
        <div className="fixed w-full z-10 desktop:top-header-height">
            <LinearProgress />
        </div>
    );
}
