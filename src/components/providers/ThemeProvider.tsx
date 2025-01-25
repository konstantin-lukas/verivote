"use client";

import { createTheme, type PaletteMode } from "@mui/material/styles";
import { ThemeProvider as Provider } from "@mui/system";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "@/../tailwind.config";

const config = resolveConfig(tailwindConfig);

export default function LocalizationProvider({ children }: { children: ReactNode }) {
    const { resolvedTheme } = useTheme();
    const theme = createTheme({
        typography: {
            fontFamily: "Jost",
        },
        palette: {
            mode: resolvedTheme as PaletteMode,
            primary: {
                main: config.theme.colors["verivote-turquoise"],
                contrastText: "#fff",
            },
            secondary: {
                main: config.theme.colors["verivote-cyan"],
                contrastText: "#fff",
            },
        },
    });
    return <Provider theme={theme}>{children}</Provider>;
}
