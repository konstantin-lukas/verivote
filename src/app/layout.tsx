import "@/app/globals.css";

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { ThemeProvider } from "next-themes";
import React, { type ReactNode } from "react";

// import { getServerSession } from "next-auth";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata: Metadata = {
    title: "Verivote - Voting Matters",
    description:
        "With Verivote, you can create polls using alternative voting systems, making it easier to reach a " +
        "decision that reflects everyone's preferences.",
};

const jost = Jost({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "600", "700"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    // const session = await getServerSession();

    return (
        <html
            lang="en"
            suppressHydrationWarning={true}
            className={jost.className}
        >
            <body className="bg-neutral-100 dark:bg-neutral-900">
                <ThemeProvider
                    attribute="data-color-scheme"
                    enableSystem={true}
                >
                    <SessionProvider basePath="/auth">
                        {/*<Header signedIn={!!session}/>*/}
                        <main>{children}</main>
                        {/*<Footer/>*/}
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
