import React from "react";

import BlockLink from "@/components/BlockLink";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Home() {
    return (
        <div>
            Hello, world!
            <BlockLink href="https://reactjs.org">
                Hello, world!
            </BlockLink>
            <ThemeToggle/>
        </div>
    );
}
