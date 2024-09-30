import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Verivote - Polls That Satisfy",
    description: "With Verivote, you can create polls using alternative voting systems, making it easier to reach a " +
        "decision that reflects everyone's preferences.",
};

export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
