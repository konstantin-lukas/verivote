"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import { LuChartPie } from "react-icons/lu";
import { MdOutlineHowToVote } from "react-icons/md";

import ApprovalVotingForm from "@/components/forms/voting/ApprovalVotingForm";
import PluralityVotingForm from "@/components/forms/voting/PluralityVotingForm";
import RankedVotingForm from "@/components/forms/voting/RankedVotingForm";
import ScoreVotingForm from "@/components/forms/voting/ScoreVotingForm";
import BlockButton from "@/components/interaction/BlockButton";
import ShareButton from "@/components/interaction/ShareButton";
import Wrapper from "@/components/layout/Wrapper";
import WrapperSmall from "@/components/layout/WrapperSmall";
import H1 from "@/components/typography/H1";
import { LONG_DATE_FORMAT } from "@/const/date";
import type { Poll, PollSummary } from "@/types/poll";
import type { VotingMethodDetails } from "@/types/votingMethod";

export default function PollViewController({
    poll,
    info,
    defaultHasVoted,
}: {
    poll: Poll;
    results: PollSummary;
    info: VotingMethodDetails;
    defaultHasVoted: boolean;
}) {
    const date = new Date(poll.closingTime);
    const [showResults, setShowResults] = useState(false);
    const [hasVoted, setHasVoted] = useState(defaultHasVoted);
    // const [pollResults, setPollResults] = useState(results);
    // useEffect(() => {
    //     setShowResults(hasVoted);
    //     fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/results/" + poll.id)
    //         .then(data => data.json())
    //         .then(json => setPollResults(json))
    //         .catch(() => window.location.reload());
    // }, [hasVoted, poll.id]);
    // useEffect(() => {
    //     fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/voted/" + poll.id)
    //         .then(res => res.json())
    //         .then(data => {
    //             setShowResults(data.hasVoted);
    //             setHasVoted(data.hasVoted);
    //         })
    //         .catch(() => setShowResults(true));
    // }, [poll.id]);

    return (
        <>
            <Wrapper className="flex flex-col items-center">
                <H1 customSizes="text-2xl sm:text-3xl md:text-4xl" className="text-center">
                    {poll.title}
                </H1>
                <h2 className="text-dark-font dark:text-light-font mb-2 text-lg font-bold uppercase sm:text-xl md:text-2xl">
                    {info.name}
                </h2>
                <span className="text-center text-neutral-500">
                    {date >= new Date() ? "Closing time" : "This poll ended on"}: {format(date, LONG_DATE_FORMAT)}
                </span>
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <ShareButton url={`${process.env.NEXT_PUBLIC_ORIGIN}/poll/${poll.id}`} />
                    {date >= new Date() && !showResults && !hasVoted && (
                        <BlockButton className="flex items-center justify-center" onClick={() => setShowResults(true)}>
                            <LuChartPie className="mr-1 inline-block size-4 translate-y-[-.1rem]" />
                            <span>See results</span>
                        </BlockButton>
                    )}
                    {date >= new Date() && showResults && !hasVoted && (
                        <BlockButton className="flex items-center justify-center" onClick={() => setShowResults(false)}>
                            <MdOutlineHowToVote className="mr-1 inline-block size-4 translate-y-[-.1rem]" />
                            <span>Vote</span>
                        </BlockButton>
                    )}
                </div>
            </Wrapper>
            <WrapperSmall>
                {date >= new Date() &&
                    !hasVoted &&
                    !showResults &&
                    ["Instant-Runoff", "Positional Voting"].includes(info.name) && (
                        <RankedVotingForm poll={poll} setHasVoted={setHasVoted} />
                    )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Score Voting" && (
                    <ScoreVotingForm poll={poll} setHasVoted={setHasVoted} />
                )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Approval Voting" && (
                    <ApprovalVotingForm poll={poll} setHasVoted={setHasVoted} />
                )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Plurality Voting" && (
                    <PluralityVotingForm poll={poll} setHasVoted={setHasVoted} />
                )}
                {/*{(date < new Date() || hasVoted || showResults) && <PollResults poll={poll} results={pollResults} />}*/}
            </WrapperSmall>
        </>
    );
}
