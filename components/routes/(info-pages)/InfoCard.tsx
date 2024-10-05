import Image from "next/image";
import React from "react";
import { LuBrush } from "react-icons/lu";

import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import type { VotingMethod } from "@/data/types";

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
                    <div className="border-l-2 border-dark-font pl-4 dark:border-light-font">
                        <span
                            className="relative -top-1.5 bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text text-xl font-bold uppercase text-transparent">
                            Pros
                        </span>
                        <ul className="relative top-1 -mt-1">
                            {votingMethod.pros}
                        </ul>
                    </div>
                    <div className="mt-8 border-l-2 border-dark-font pl-4 dark:border-light-font">
                        <span
                            className="relative -top-1.5 bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text text-xl font-bold uppercase text-transparent">
                            Cons
                        </span>
                        <ul className="relative top-1 -mt-1">
                            {votingMethod.cons}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}