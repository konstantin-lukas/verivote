import Image from "next/image";
import { MdArrowForward } from "react-icons/md";

import BlockLink from "@/components/navigation/BlockLink";
import H2 from "@/components/typography/H2";
import type { VotingMethodDetails } from "@/types/votingMethod";

export default function Card({ votingMethod }: { votingMethod: VotingMethodDetails }) {
    const heading = (
        <div className="relative inline-block">
            <H2>{votingMethod.name}</H2>
            {votingMethod?.tag && (
                <span className="absolute left-0 top-0 translate-y-[calc(-100%-1rem)] rounded-full bg-red-600 px-2 text-[0.8rem] text-white">
                    {votingMethod.tag}
                </span>
            )}
        </div>
    );

    const illustration = (
        <div className="mb-6 flex justify-center">
            <Image
                src={votingMethod.illustration}
                alt={votingMethod.illustrationAlt}
                className="w-full select-none pr-8 sm:w-8/12 md:w-full"
                draggable={false}
                priority
            />
        </div>
    );

    const footnotes = (
        <div>
            <p>
                <b className="font-bold">Best for:</b> {votingMethod.bestFor}
            </p>
            <BlockLink href={votingMethod.infoPage} className="mt-8 flex justify-center">
                <MdArrowForward className="relative top-[-.1rem] inline" size="1rem" />
                <span className="ml-1">Learn more</span>
            </BlockLink>
        </div>
    );

    return (
        <div className="flex flex-col justify-between">
            <div>
                {heading}
                <p className="mb-6">{votingMethod.shortDescription}</p>
                {illustration}
            </div>
            {footnotes}
        </div>
    );
}
