"use client";

import type { PaletteMode } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Provider } from "@mui/system";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function LocalizationProvider({ children }: { children: ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [theme, setTheme] = useState(createTheme());

    useEffect(() => {
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-verivote-turquoise");
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--color-verivote-cyan");
        setTheme(
            createTheme({
                palette: {
                    mode: resolvedTheme as PaletteMode,
                    primary: { main: primaryColor, contrastText: "#fff" },
                    secondary: { main: secondaryColor, contrastText: "#fff" },
                },
                typography: { fontFamily: "Jost" },
            }),
        );
    }, [resolvedTheme]);

    return <Provider theme={theme}>{children}</Provider>;
}
