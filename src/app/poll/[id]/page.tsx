import { notFound } from "next/navigation";
import { MdArrowForward } from "react-icons/md";

import PollViewController from "@/components/layout/PollViewController";
import WrapperSmall from "@/components/layout/WrapperSmall";
import BlockLink from "@/components/navigation/BlockLink";
import H3 from "@/components/typography/H3";
import { VOTING_METHODS } from "@/const/misc";
import { findPollById, hasIpVotedOnPoll } from "@/database/poll";
import { getPollResults } from "@/utils/results";
import { getIpAddress } from "@/utils/server";

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
    const ip = await getIpAddress();
    if (!ip) notFound();
    const [poll, hasVoted] = await Promise.all([findPollById(id), hasIpVotedOnPoll(id, ip)]);
    if (!poll) notFound();
    const matchingInfo = VOTING_METHODS.find(x => x.dbId === poll.votingMethod);
    if (!matchingInfo) notFound();

    const results = getPollResults(poll);

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
