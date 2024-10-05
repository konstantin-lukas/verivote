"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import logo from "@/public/verivote_logo.svg";
import logoDark from "@/public/verivote_logo_dark.svg";

export default function Logo({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const src = (() => {
        if (resolvedTheme === "dark") {
            return logoDark;
        } else {
            return logo;
        }
    })();

    return (
        <Image
            className={"select-none " + className}
            src={src}
            alt="Verivote Logo"
            priority
            draggable={false}
        />
    );
}