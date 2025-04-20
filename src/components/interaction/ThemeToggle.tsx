"use client";

import { useHasMounted } from "anzol";
import { useTheme } from "next-themes";
import { CiCloudMoon, CiSun } from "react-icons/ci";

export default function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const hasMounted = useHasMounted();

    return (
        <button
            className={`${className} group cursor-pointer`}
            aria-label="Toggle theme"
            onClick={() => {
                setTheme(hasMounted && resolvedTheme === "dark" ? "light" : "dark");
            }}
        >
            {hasMounted && resolvedTheme === "dark" ? (
                <CiSun className="fill-light-font size-full transition-all group-hover:scale-110" />
            ) : (
                <CiCloudMoon className="fill-dark-font size-full transition-all group-hover:scale-110" />
            )}
        </button>
    );
}
