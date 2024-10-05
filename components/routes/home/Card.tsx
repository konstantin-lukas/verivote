import type { ReactNode } from "react";
import React from "react";
import { LuBrush } from "react-icons/lu";

import BlockLink from "@/components/shared/BlockLink";
import H2 from "@/components/shared/H2";

export default function Card({ heading, children, href, pros, cons, bestFor, tag }: {
    heading: string,
    children: string,
    href: string,
    pros: ReactNode,
    cons: ReactNode,
    bestFor: string,
    tag?: string,
}) {
    console.log(tag);
    return (
        <div className="flex flex-col justify-between">
            <div>
                <div
                    className={tag && `after:top:0 relative inline-block after:absolute after:left-0
                        after:-translate-y-[calc(100%+1rem)] after:rounded-full after:bg-red-600 after:px-2 after:text-[0.8rem]
                        after:text-white after:content-['Recommended']`}
                >
                    <H2>
                        {heading}
                    </H2>
                </div>
                <p className="mb-6">
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
            <div>
                <p className="mt-6">
                    <b className="font-bold">Best for:</b> {bestFor}
                </p>
                <BlockLink href={href} className="mt-8 flex justify-center">
                    <LuBrush className="inline" size="1rem"/>
                    <span className="ml-1">Create</span>
                </BlockLink>
            </div>
        </div>
    );
}