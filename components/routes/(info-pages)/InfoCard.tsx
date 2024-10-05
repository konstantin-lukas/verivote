import Image from "next/image";
import type { ReactNode } from "react";
import React from "react";
import { LuBrush } from "react-icons/lu";

import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import type { VotingMethod } from "@/data/types";

function List({ heading, children }: { heading: string, children: ReactNode }) {
    return (
        <div className="mt-8 dark:border-light-font">
            <span
                className="relative -top-1.5 bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text
                text-xl font-bold uppercase text-transparent"
            >
                {heading}
            </span>
            <ul className="relative top-1 [&>li::after]:absolute [&>li::after]:left-0 [&>li::after]:top-1/2
            [&>li::after]:h-[calc(100%-.75rem)] [&>li::after]:w-[2px] [&>li::after]:-translate-y-1/2
            [&>li::after]:bg-dark-font [&>li::after]:content-[''] [&>li::after]:dark:bg-light-font [&>li:first-of-type]:mt-0
            [&>li]:relative [&>li]:mt-4 [&>li]:pl-4"
            >
                {children}
            </ul>
        </div>
    );
}

export default function InfoCard({ votingMethod }: { votingMethod: VotingMethod }) {
    return (
        <div className="grid grid-cols-2 gap-24 py-24">
            <div className="mb-6 flex flex-col justify-center">
                <H1>
                    {votingMethod.name}
                </H1>
                <p className="mb-6">
                    {votingMethod.longDescription}
                </p>
                <Image
                    src={votingMethod.illustration}
                    alt={votingMethod.illustrationAlt}
                    className="h-auto w-full select-none pr-8"
                    draggable={false}
                    priority
                />
                <p>
                    <b className="font-bold">Best for:</b> {votingMethod.bestFor}
                </p>
                <BlockLink href={votingMethod.createPage} className="mt-8 flex justify-center">
                    <LuBrush className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Create</span>
                </BlockLink>
            </div>
            <div>
                <div className="gap-8">
                    <List heading="Pros">
                        {votingMethod.pros}
                    </List>
                    <List heading="Cons">
                        {votingMethod.cons}
                    </List>
                </div>
            </div>
        </div>
    );
}