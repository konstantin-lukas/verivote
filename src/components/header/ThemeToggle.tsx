"use client";

import { useHasMounted } from "anzol";
import { useTheme } from "next-themes";
import React from "react";
import { CiCloudMoon, CiSun } from "react-icons/ci";

export default function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const hasMounted = useHasMounted();

    return (
        <button
            className={className + " group"}
            aria-label="Toggle theme"
            onClick={() => {
                setTheme(hasMounted && resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {hasMounted && resolvedTheme === "dark" ? (
                <CiSun className="size-full fill-light-font transition-all group-hover:scale-110" />
            ) : (
                <CiCloudMoon className="size-full fill-dark-font transition-all group-hover:scale-110" />
            )}
        </button>
    );
}
