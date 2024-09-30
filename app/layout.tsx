import "./global.css";

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React from "react";

import Header from "@/components/Header";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
    title: "Verivote - Polls That Satisfy",
    description: "With Verivote, you can create polls using alternative voting systems, making it easier to reach a " +
        "decision that reflects everyone's preferences.",
};

const jost = Jost({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true} className={jost.className}>
            <body className="bg-neutral-100 dark:bg-neutral-900">
                <ThemeProvider
                    attribute="data-color-scheme"
                    enableSystem={true}
                >
                    <SessionProvider>
                        <Header/>
                        <main>
                            {children}
                        </main>
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
