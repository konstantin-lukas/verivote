import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            boxShadow: {
                "3d": "-0.15rem -0.15rem 0.15rem 0.15rem #fff, 0.15rem 0.15rem 0.15rem 0.15rem rgba(0, 0, 0, 0.1)",
                "3d-inset": "-0.15rem -0.15rem 0.15rem 0.15rem #fff, " +
                    "0.15rem 0.15rem 0.15rem 0.15rem rgba(0, 0, 0, 0.1), " +
                    "inset -0.15rem -0.15rem 0.15rem 0.15rem #fff, " +
                    "inset 0.15rem 0.15rem 0.15rem 0.15rem rgba(0, 0, 0, 0.1)",
                "dark-3d": "-0.15rem -0.15rem 0.15rem 0.15rem rgba(255, 255, 255, 0.1), 0.15rem 0.15rem 0.15rem 0.15rem #060606",
                "dark-3d-inset": "-0.15rem -0.15rem 0.15rem 0.15rem rgba(255, 255, 255, 0.1), " +
                    "0.15rem 0.15rem 0.15rem 0.15rem #060606, " +
                    "inset -0.15rem -0.15rem 0.15rem 0.15rem rgba(255, 255, 255, 0.1), " +
                    "inset 0.15rem 0.15rem 0.15rem 0.15rem #060606",
            },
        },
    },
    darkMode: [
        "selector",
        "html[data-color-scheme=dark]",
    ],
    plugins: [],
};
export default config;
