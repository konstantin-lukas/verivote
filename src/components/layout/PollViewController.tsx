"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import { LuChartPie } from "react-icons/lu";
import { MdOutlineHowToVote } from "react-icons/md";

import { getPoll } from "@/actions/poll";
import Snackbar from "@/components/alert/Snackbar";
import ApprovalVotingForm from "@/components/forms/voting/ApprovalVotingForm";
import PluralityVotingForm from "@/components/forms/voting/PluralityVotingForm";
import RankedVotingForm from "@/components/forms/voting/RankedVotingForm";
import ScoreVotingForm from "@/components/forms/voting/ScoreVotingForm";
import PollResults from "@/components/informational/PollResults";
import BlockButton from "@/components/interaction/BlockButton";
import ShareButton from "@/components/interaction/ShareButton";
import Wrapper from "@/components/layout/Wrapper";
import WrapperSmall from "@/components/layout/WrapperSmall";
import H1 from "@/components/typography/H1";
import { LONG_DATE_FORMAT } from "@/const/date";
import type { Poll, PollResult } from "@/types/poll";
import type { VotingMethodDetails } from "@/types/votingMethod";
import { getPollResults } from "@/utils/results";

export default function PollViewController({
    poll,
    info,
    defaultHasVoted,
    results,
}: {
    poll: Poll;
    results: PollResult;
    info: VotingMethodDetails;
    defaultHasVoted: boolean;
}) {
    const [showResults, setShowResults] = useState(false);
    const [hasVoted, setHasVoted] = useState(defaultHasVoted);
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        if (successMessage) setHasVoted(true);
    }, [successMessage]);
    const [pollResults, setPollResults] = useState(results);
    useEffect(() => {
        setShowResults(hasVoted);
        getPoll(poll.id).then(({ data, error }) => {
            if (!error) {
                setPollResults(getPollResults(data));
            }
        });
    }, [hasVoted, poll.id]);

    const now = new Date();
    const [formattedDate, setFormattedDate] = useState<string | null>(null);
    useEffect(() => {
        setFormattedDate(format(poll.closingTime, LONG_DATE_FORMAT));
    }, [poll.closingTime]);

    return (
        <>
            <Wrapper className="flex flex-col items-center">
                <H1 customSizes="text-2xl sm:text-3xl md:text-4xl" className="text-center" data-test-id="poll-title">
                    {poll.title}
                </H1>
                <h2
                    data-test-id="poll-type-heading"
                    className="text-dark-font dark:text-light-font mb-2 text-lg font-bold uppercase sm:text-xl md:text-2xl"
                >
                    {info.name}
                </h2>
                <span className="animate-fade-in text-center text-neutral-600 dark:text-neutral-400">
                    {formattedDate && (poll.closingTime >= now ? "Closing time: " : "This poll ended on: ")}
                    {!formattedDate && <br />}
                    {formattedDate}
                </span>
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                    <ShareButton
                        url={`${process.env.NEXT_PUBLIC_ORIGIN}/poll/${poll.id}`}
                        data-test-id="share-button"
                    />
                    {poll.closingTime >= now && !showResults && !hasVoted && (
                        <BlockButton
                            className="flex items-center justify-center"
                            onClick={() => setShowResults(true)}
                            data-test-id="see-results-button"
                        >
                            <LuChartPie className="mr-1 inline-block size-4 translate-y-[-.1rem]" />
                            <span>See results</span>
                        </BlockButton>
                    )}
                    {poll.closingTime >= now && showResults && !hasVoted && (
                        <BlockButton className="flex items-center justify-center" onClick={() => setShowResults(false)}>
                            <MdOutlineHowToVote className="mr-1 inline-block size-4 translate-y-[-.1rem]" />
                            <span>Vote</span>
                        </BlockButton>
                    )}
                </div>
            </Wrapper>
            <WrapperSmall>
                {poll.closingTime >= now &&
                    !hasVoted &&
                    !showResults &&
                    ["Instant-Runoff", "Positional Voting"].includes(info.name) && (
                        <RankedVotingForm poll={poll} setSuccessMessage={setSuccessMessage} />
                    )}
                {poll.closingTime >= now && !hasVoted && !showResults && info.name === "Score Voting" && (
                    <ScoreVotingForm poll={poll} setSuccessMessage={setSuccessMessage} />
                )}
                {poll.closingTime >= now && !hasVoted && !showResults && info.name === "Approval Voting" && (
                    <ApprovalVotingForm poll={poll} setSuccessMessage={setSuccessMessage} />
                )}
                {poll.closingTime >= now && !hasVoted && !showResults && info.name === "Plurality Voting" && (
                    <PluralityVotingForm poll={poll} setSuccessMessage={setSuccessMessage} />
                )}
                {(poll.closingTime < now || hasVoted || showResults) && (
                    <PollResults poll={poll} results={pollResults} />
                )}
            </WrapperSmall>
            <Snackbar message={successMessage} />
        </>
    );
}
