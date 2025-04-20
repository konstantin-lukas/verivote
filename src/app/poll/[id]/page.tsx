import { notFound } from "next/navigation";
import React from "react";
import { MdArrowForward } from "react-icons/md";

import PollViewController from "@/components/layout/PollViewController";
import WrapperSmall from "@/components/layout/WrapperSmall";
import BlockLink from "@/components/navigation/BlockLink";
import H3 from "@/components/typography/H3";
import { VOTING_METHODS } from "@/const/misc";
import { findPollById } from "@/database/poll";
import { VotingMethod } from "@/enum/poll";
import type { PollSummary } from "@/types/poll";

export async function generateMetadata(context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const poll = await findPollById(id);
    if (poll) {
        return {
            title: `${poll.title} - Verivote`,
        };
    }
    return {
        title: "Not found",
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [poll, hasVoted, results] = await Promise.all([
        await findPollById(id),
        Promise.resolve(false),
        Promise.resolve<PollSummary>({
            title: "string",
            votingMethod: VotingMethod.INSTANT_RUNOFF_VOTING,
            voterCount: 0,
            winners: [],
            options: ["Foo", "Bar"],
            results: [],
            closingDate: new Date(),
        }),
    ]);

    if (!poll) notFound();
    const matchingInfo = VOTING_METHODS.find(x => x.dbId === poll.votingMethod);
    if (!matchingInfo) notFound();

    return (
        <div className="min-h-main-height-mobile desktop:min-h-main-height py-24">
            <PollViewController poll={poll} results={results} info={matchingInfo} defaultHasVoted={hasVoted} />
            <WrapperSmall>
                <div>
                    <H3>How does this poll work?</H3>
                    <p>{matchingInfo.longDescription}</p>
                </div>
                <BlockLink href={matchingInfo.infoPage} className="mt-5 inline-block">
                    <MdArrowForward className="relative top-[-.1rem] inline" size="1rem" />
                    <span className="ml-1">Learn more</span>
                </BlockLink>
            </WrapperSmall>
        </div>
    );
}
