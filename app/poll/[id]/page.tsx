import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { MdArrowForward } from "react-icons/md";

import ViewController from "@/components/routes/poll/ViewController";
import BlockLink from "@/components/shared/BlockLink";
import H3 from "@/components/shared/H3";
import WrapperSmall from "@/components/shared/WrapperSmall";
import type { Poll, VotingMethod } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

export default async function Page({ params }: { params: { id: string } }) {

    let poll: Poll, matchingInfo: VotingMethod | undefined, hasVoted: boolean;
    try {
        const { id } = params;
        const response = await Promise.all([
            fetch(process.env.LOCAL_API_ORIGIN + "/poll/" + id),
            fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/voted/" + id, {
                headers: {
                    "X-Forwarded-For": headers().get("X-Forwarded-For") ?? "",
                    "X-Real-Ip": headers().get("X-Real-Ip") ?? "",
                },
            }),
        ]);
        if (!response[0].ok || !response[1].ok) notFound();
        poll = await response[0].json();
        hasVoted = (await response[1].json()).hasVoted;
        matchingInfo = votingMethods.find(x => x.dbId === poll.method);
        if (!matchingInfo) notFound();
    } catch {
        notFound();
    }

    return (
        <div className="min-h-[var(--main-height-mobile)] py-24 desktop:min-h-[var(--main-height)]">
            <ViewController poll={poll} info={matchingInfo} defaultHasVoted={hasVoted}/>
            <WrapperSmall>
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