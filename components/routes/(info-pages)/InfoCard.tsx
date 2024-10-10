import Image from "next/image";
import type { ReactNode } from "react";
import React from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import { LuBrush } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";

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
                    <div className="mt-4 border-t-2 border-neutral-300 pt-4 dark:border-neutral-700">
                        <Image
                            src={votingMethod.illustration}
                            alt={votingMethod.illustrationAlt}
                            className="mx-auto mb-8 mt-4 h-auto w-full select-none md:w-1/2 xl:w-full"
                            draggable={false}
                            priority
                        />
                        <p className="mb-6">
                            {votingMethod.longDescription}
                        </p>
                        <p>
                            <b className="font-bold">Best for:</b> {votingMethod.bestFor}
                        </p>
                    </div>
                </div>
                <div>
                    <H2>
                        Trade-offs
                    </H2>
                    <div className="mt-4 border-t-2 border-neutral-300 pt-4 dark:border-neutral-700">
                        <List heading="Advantages">
                            {votingMethod.pros}
                        </List>
                        <List heading="Disadvantages">
                            {votingMethod.cons}
                        </List>
                    </div>
                </div>
            </div>
            <div className="mt-16 flex flex-col justify-center gap-8 border-t-2 border-neutral-300 pt-16 sm:flex-row dark:border-neutral-700">
                <BlockLink href={"/create?type=" + votingMethod.shorthand} className="inline-flex w-full justify-center sm:w-auto">
                    <LuBrush className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Start a poll</span>
                </BlockLink>
                <BlockLink href={votingMethod.learnMoreLink} className="inline-flex w-full justify-center sm:w-auto" target={"_blank"}>
                    <RiExternalLinkLine className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Learn More</span>
                </BlockLink>
            </div>
        </div>
    );
}