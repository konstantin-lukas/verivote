import type { ReactNode } from "react";
import React from "react";
import { LuBrush } from "react-icons/lu";

import BlockLink from "@/components/shared/BlockLink";
import H2 from "@/components/shared/H2";

export default function Card({ heading, children, href, pros, cons }: {
    heading: string,
    children: string,
    href: string,
    pros: ReactNode,
    cons: ReactNode,
}) {
    return (
        <div className="flex flex-col justify-between">
            <div>
                <H2>
                    {heading}
                </H2>
                <p className="mb-4">
                    {children}
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="border-l-2 border-dark-font pl-4 dark:border-light-font">
                        <span className="relative -top-1.5 bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text text-xl font-bold uppercase text-transparent">
                            Pros
                        </span>
                        <ul className="relative top-1 -mt-1">
                            <li>
                                {pros}
                            </li>
                        </ul>
                    </div>
                    <div className="border-l-2 border-dark-font pl-4 dark:border-light-font">
                        <span className="relative -top-1.5 bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text text-xl font-bold uppercase text-transparent">
                            Cons
                        </span>
                        <ul className="relative top-1 -mt-1">
                            <li>
                                {cons}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <BlockLink href={href} className="mt-8 flex justify-center">
                <LuBrush className="inline" size="1rem"/>
                <span className="ml-1">Create</span>
            </BlockLink>
        </div>
    );
}