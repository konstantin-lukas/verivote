import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./data/votingMethods.tsx",
    ],
    theme: {
        extend: {
            keyframes: {
                "ltr-checkbox": {
                    "0%": {
                        width: "50%",
                        left: "0",
                        right: "auto",
                    },
                    "50%": {
                        width: "100%",
                        left: "0",
                        right: "auto",
                    },
                    "51%": {
                        width: "100%",
                        right: "0",
                        left: "auto",
                    },
                    "100%": {
                        width: "50%",
                        right: "0",
                        left: "auto",
                    },
                },
                "rtl-checkbox": {
                    "0%": {
                        width: "50%",
                        right: "0",
                        left: "auto",
                    },
                    "50%": {
                        width: "100%",
                        left: "auto",
                        right: "0",
                    },
                    "51%": {
                        width: "100%",
                        left: "0",
                        right: "auto",
                    },
                    "100%": {
                        width: "50%",
                        left: "0",
                        right: "auto",
                    },
                },
            },
            colors: {
                "verivote-turquoise": "#12d4ae",
                "verivote-cyan": "#129dd4",
                "dark-font": "rgb(38 38 38)",
                "light-font": "rgb(229 229 229)",
            },
            boxShadow: {
                "3d": "-0.16rem -0.16rem 0.16rem 0.16rem #fff, 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "3d-inset": "inset -0.1rem -0.1rem 0.1rem 0.1rem #fff, inset 0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1)",
                "3d-both": "-0.16rem -0.16rem 0.16rem 0.16rem #fff, " +
                    "0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1), " +
                    "inset -0.16rem -0.16rem 0.16rem 0.16rem #fff, " +
                    "inset 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "dark-3d": "-0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
                "dark-3d-inset": "inset -0.1rem -0.1rem 0.1rem 0.1rem rgba(255, 255, 255, 0.1), inset 0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.5)",
                "dark-3d-both": "-0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), " +
                    "0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5), " +
                    "inset -0.16rem -0.16rem 0.16rem 0.16rem rgba(255, 255, 255, 0.1), " +
                    "inset 0.16rem 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
                "header": "0 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.1)",
                "dark-header": "0 0.16rem 0.16rem 0.16rem rgba(0, 0, 0, 0.5)",
                "vague": "0 0 2rem rgba(0, 0, 0, 0.2)",
                "dark-vague": "0 0 2rem rgba(0, 0, 0, .75)",
            },
            screens: {
                "desktop": {
                    "raw": "(min-width: 1024px) and (min-height: 640px)",
                },
            },
            height: {
                "header": "6rem",
                "footer": "3rem",
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
