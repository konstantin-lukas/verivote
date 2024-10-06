import Image from "next/image";
import type { ReactNode } from "react";
import React from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { LuBrush } from "react-icons/lu";

import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import H2 from "@/components/shared/H2";
import type { VotingMethod } from "@/data/types";

function List({ heading, children }: { heading: string, children: ReactNode }) {
    const color = heading === "Advantages" ? "text-green-600"  : "text-red-600";
    return (
        <div className="mt-14 first:mt-4 dark:border-light-font">
            <span
                className={"flex items-center relative rounded-full -top-1.5 text-2xl font-bold uppercase " + color}
            >
                {heading === "Advantages" ? <BiSolidUpvote className="mr-2 inline"/> : <BiSolidDownvote className="mr-2 inline"/>}
                {heading}
                {heading === "Advantages" ? <BiSolidUpvote className="ml-2 inline"/> : <BiSolidDownvote className="ml-2 inline"/>}
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
        <div className="mb-48 mt-32">
            <div className="mb-12">
                <H1>
                    {votingMethod.name}
                </H1>
            </div>
            <div className="grid grid-cols-1 gap-24 pt-4 xl:grid-cols-2">
                <div>
                    <H2>
                        How It Works
                    </H2>
                    <div className="mt-6 border-t-2 border-neutral-300 pt-4">
                        <Image
                            src={votingMethod.illustration}
                            alt={votingMethod.illustrationAlt}
                            className="mb-8 h-auto w-full select-none"
                            draggable={false}
                            priority
                        />
                        <p className="mb-6">
                            {votingMethod.longDescription}
                        </p>
                        <p>
                            <b className="font-bold">Best for:</b> {votingMethod.bestFor}
                        </p>
                        <BlockLink href={votingMethod.createPage} className="mt-8 flex justify-center">
                            <LuBrush className="relative top-[-.1rem] inline" size="1rem"/>
                            <span className="ml-1">Create</span>
                        </BlockLink>
                    </div>
                </div>
                <div>
                    <H2>
                        Trade-offs
                    </H2>
                    <div className="mt-4 border-t-2 border-neutral-300 pt-4">
                        <List heading="Advantages">
                            {votingMethod.pros}
                        </List>
                        <List heading="Disadvantages">
                            {votingMethod.cons}
                        </List>
                    </div>
                </div>
            </div>
        </div>
    );
}