"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { CiCloudMoon, CiSun } from "react-icons/ci";

export default function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            className={className}
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
            onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {
                resolvedTheme === "dark"
                    ? <CiSun className="size-full fill-[color:var(--light-font)]"/>
                    : <CiCloudMoon className="size-full fill-[color:var(--dark-font)]"/>
            }
        </button>
    );
}