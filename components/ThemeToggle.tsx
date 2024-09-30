"use client";

import { useTheme } from "next-themes";
import React from "react";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    return (
        <button
            onClick={() => {
                setTheme(theme === "dark" || theme === "system" && systemTheme === "dark" ? "light" : "dark");
            }}
        >
            Toggle
        </button>
    );
}