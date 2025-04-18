"use client";

import { useHasMounted } from "anzol";
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

import logo from "@/public/verivote_logo.svg";
import logoDark from "@/public/verivote_logo_dark.svg";

export default function Logo({ className, alt }: { className?: string; alt: string }) {
    const mounted = useHasMounted();
    const { resolvedTheme } = useTheme();

    const src = (() => {
        if (mounted && resolvedTheme === "dark") {
            return logoDark;
        }
        return logo;
    })();

    return <Image className={`select-none ${className}`} src={src} alt={alt} priority draggable={false} />;
}
