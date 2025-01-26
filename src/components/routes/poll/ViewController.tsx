"use client";

import React, { useState } from "react";
import { LuChartPie } from "react-icons/lu";
import { MdOutlineHowToVote } from "react-icons/md";

import ApprovalVoting from "@/components/routes/poll/ApprovalVoting";
import PluralityVoting from "@/components/routes/poll/PluralityVoting";
import RankedVoting from "@/components/routes/poll/RankedVoting";
import ScoreVoting from "@/components/routes/poll/ScoreVoting";
import ShareButton from "@/components/routes/poll/ShareButton";
import BlockButton from "@/components/shared/BlockButton";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import WrapperSmall from "@/components/shared/WrapperSmall";
import type { VotingMethodDetails } from "@/types";
import type { Poll, PollSummary } from "@/types/poll";
import { formatDate } from "@/utils";

export default function ViewController({
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
            <Wrapper className="flex  flex-col items-center">
                <H1 customSizes="text-2xl sm:text-3xl md:text-4xl" className="text-center">
                    {poll.title}
                </H1>
                <h2 className="mb-2 text-lg font-bold uppercase text-dark-font sm:text-xl md:text-2xl dark:text-light-font">
                    {info.name}
                </h2>
                <span className="text-center text-neutral-500">
                    {date >= new Date() ? "Closing time" : "This poll ended on"}: {formatDate(date)}
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
                        <RankedVoting poll={poll} setHasVoted={setHasVoted} />
                    )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Score Voting" && (
                    <ScoreVoting poll={poll} setHasVoted={setHasVoted} />
                )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Approval Voting" && (
                    <ApprovalVoting poll={poll} setHasVoted={setHasVoted} />
                )}
                {date >= new Date() && !hasVoted && !showResults && info.name === "Plurality Voting" && (
                    <PluralityVoting poll={poll} setHasVoted={setHasVoted} />
                )}
                {/*{(date < new Date() || hasVoted || showResults) && <PollResults poll={poll} results={pollResults} />}*/}
            </WrapperSmall>
        </>
    );
}
