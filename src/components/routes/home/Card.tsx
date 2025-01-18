import Image from "next/image";
import React from "react";
import { MdArrowForward } from "react-icons/md";

import BlockLink from "@/components/shared/BlockLink";
import H2 from "@/components/shared/H2";
import type { VotingMethod } from "@/types";

export default function Card({ votingMethod }: { votingMethod: VotingMethod }) {
    return (
        <div className="flex flex-col justify-between">
            <div>
                <div className="relative inline-block">
                    <H2>{votingMethod.name}</H2>
                    {votingMethod?.tag && (
                        <span
                            className="absolute left-0 top-0 translate-y-[calc(-100%-1rem)] rounded-full bg-red-600
                            px-2 text-[0.8rem] text-white"
                        >
                            {votingMethod.tag}
                        </span>
                    )}
                </div>
                <p className="mb-6">{votingMethod.shortDescription}</p>
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
                    <b className="font-bold">Best for:</b>{" "}
                    {votingMethod.bestFor}
                </p>
                <BlockLink
                    href={votingMethod.infoPage}
                    className="mt-8 flex justify-center"
                >
                    <MdArrowForward
                        className="relative top-[-.1rem] inline"
                        size="1rem"
                    />
                    <span className="ml-1">Learn more</span>
                </BlockLink>
            </div>
        </div>
    );
}
