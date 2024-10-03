import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "verivote-turquoise": "#12d4ae",
                "verivote-cyan": "#129dd4",
            },
            boxShadow: {
                "3d": "-0.16rem -0.16rem 0.16rem 0.16rem #fff, 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "3d-inset": "-0.16rem -0.16rem 0.16rem 0.16rem #fff, " +
                    "0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1), " +
                    "inset -0.16rem -0.16rem 0.16rem 0.16rem #fff, " +
                    "inset 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "dark-3d": "-0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
                "dark-3d-inset": "-0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), " +
                    "0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5), " +
                    "inset -0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), " +
                    "inset 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
                "header": "0 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "dark-header": "0 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
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
