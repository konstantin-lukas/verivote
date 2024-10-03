"use client";

import { useHasMounted } from "anzol";
import { useTheme } from "next-themes";
import React from "react";
import { CiCloudMoon, CiSun } from "react-icons/ci";


export default function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const hasMounted = useHasMounted();
    if (!hasMounted) return null;

    return (
        <button
            className={className}
            onClick={() => {
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