import Image from "next/image";
import React from "react";
import { MdArrowForward } from "react-icons/md";

import BlockLink from "@/components/shared/BlockLink";
import H2 from "@/components/shared/H2";
import type { VotingMethod } from "@/data/types";

export default function Card({ votingMethod }: { votingMethod: VotingMethod }) {
    const tagClass = votingMethod.tag ? `after:content-['${votingMethod.tag.replaceAll(" ", "_")}']` : "";

    return (
        <div className="flex flex-col justify-between">
            <div>
                <div
                    className={votingMethod.tag && `relative inline-block after:absolute 
                        after:left-0 after:top-0 after:translate-y-[calc(-100%-1rem)] after:rounded-full after:bg-red-600
                        after:px-2 after:text-[0.8rem] after:text-white ` + tagClass}
                >
                    <H2>
                        {votingMethod.name}
                    </H2>
                </div>
                <p className="mb-6">
                    {votingMethod.shortDescription}
                </p>
                <div className="mb-6 flex justify-center">
                    <Image
                        src={votingMethod.illustration}
                        alt={votingMethod.illustrationAlt}
                        className="w-full select-none pr-8 sm:w-8/12 md:w-full"
                        draggable={false}
                        priority
                    />
                </div>
            </div>
            <div>
                <p>
                    <b className="font-bold">Best for:</b> {votingMethod.bestFor}
                </p>
                <BlockLink href={votingMethod.infoPage} className="mt-8 flex justify-center">
                    <MdArrowForward className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Learn more</span>
                </BlockLink>
            </div>
        </div>
    );
}