import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import ErrorList from "@/components/alert/ErrorList";
import Snackbar from "@/components/alert/Snackbar";
import VoteButton from "@/components/interaction/VoteButton";
import H3 from "@/components/typography/H3";
import { SCORE_VOTING_COLOR_STEPS } from "@/const/poll";
import useCreateVote from "@/hooks/actions/useCreateVote";
import type { Poll } from "@/types/poll";

function PollOption({
    children,
    scores,
    setScores,
    idx,
    disabled,
}: {
    children: ReactNode;
    scores: number[];
    setScores: (scores: number[]) => void;
    idx: number;
    disabled: boolean;
}) {
    return (
        <li className="relative mt-6 flex items-center gap-6 last:mb-4">
            <span className="text-light-font pointer-events-none absolute left-8 top-1/2 w-[calc(100%-8.5rem)] translate-y-[calc(-50%-0.05rem)] overflow-hidden text-ellipsis text-nowrap mix-blend-difference">
                {children}
            </span>
            <input
                type="range"
                min={1}
                max={10}
                step={1}
                disabled={disabled}
                value={scores[idx]}
                onChange={e => {
                    const copy = [...scores];
                    copy[idx] = parseInt(e.target.value);
                    setScores(copy);
                }}
                className="w-full cursor-col-resize"
            />
            <div>
                <span
                    className="relative block size-10 rounded-full"
                    style={{ backgroundColor: SCORE_VOTING_COLOR_STEPS[scores[idx] - 1] }}
                >
                    <span className="center-absolute font-bold text-white">{scores[idx]}</span>
                </span>
            </div>
        </li>
    );
}

export default function ScoreVotingForm({
    poll,
    setSuccessMessage,
}: {
    poll: Poll;
    setSuccessMessage: (v: string) => void;
}) {
    const [scores, setScores] = useState(poll.options.map(() => 1));
    const [disabled] = useState(false);
    const { pending, action, error, data } = useCreateVote(poll.id, scores);
    const errorList = useMemo(() => error && <ErrorList errors={error} />, [error]);
    useEffect(() => {
        if (!pending && data) setSuccessMessage(data);
    }, [pending, data, setSuccessMessage]);
    return (
        <form action={action} className="my-24">
            <H3>Assign each choice a score</H3>
            <span>Adjust the sliders based on how much you like each choice</span>
            <ul className="mt-4">
                {poll.options.map((x, i) => (
                    <PollOption disabled={disabled} key={i} idx={i} scores={scores} setScores={setScores}>
                        {x}
                    </PollOption>
                ))}
            </ul>
            <VoteButton disabled={disabled} />
            <Snackbar message={errorList} />
        </form>
    );
}
