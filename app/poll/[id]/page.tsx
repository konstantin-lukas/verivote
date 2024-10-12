import { format } from "date-fns";
import { notFound } from "next/navigation";
import React from "react";
import { LuPieChart } from "react-icons/lu";
import { MdArrowForward } from "react-icons/md";

import RankedVoting from "@/components/routes/poll/RankedVoting";
import ShareButton from "@/components/routes/poll/ShareButton";
import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import H3 from "@/components/shared/H3";
import Wrapper from "@/components/shared/Wrapper";
import WrapperSmall from "@/components/shared/WrapperSmall";
import type { Poll } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/poll/" + id);
    if (!response.ok) notFound();
    const poll: Poll = await response.json();
    const date = new Date(poll.OpenUntil);
    const matchingInfo = votingMethods.find(x => x.name === poll.Method);
    if (!matchingInfo) notFound();


    return (
        <div className="min-h-[var(--main-height-mobile)] py-24 desktop:min-h-[var(--main-height)]">
            <Wrapper className="flex  flex-col items-center">
                <H1 customSizes="text-2xl sm:text-3xl md:text-4xl" className="text-center">{poll.Name}</H1>
                <h2 className="mb-2 text-lg font-bold uppercase text-dark-font sm:text-xl md:text-2xl dark:text-light-font">{poll.Method}</h2>
                <span className="text-neutral-500">Closing Time: {format(date, "dd LLLL yyyy hh:mm aa (OOOO)")}</span>
                <div className="mt-6 flex gap-6">
                    <ShareButton url="https://google.com"/>
                    <BlockLink href="/" className="flex items-center justify-center">
                        <LuPieChart className="mr-1 inline-block size-4 translate-y-[-.1rem]"/>
                        <span>
                            See results
                        </span>
                    </BlockLink>
                </div>
            </Wrapper>
            <WrapperSmall>
                {(poll.Method === "Instant-Runoff" || poll.Method === "Positional Voting") &&
                    <RankedVoting poll={poll}/>
                }
                <div>
                    <H3>
                        How does this poll work?
                    </H3>
                    <p>
                        {matchingInfo.longDescription}
                    </p>
                </div>
                <BlockLink href={matchingInfo.infoPage} className="mt-5">
                    <MdArrowForward className="relative top-[-.1rem] inline" size="1rem"/>
                    <span className="ml-1">Learn more</span>
                </BlockLink>
            </WrapperSmall>
        </div>
    );
}