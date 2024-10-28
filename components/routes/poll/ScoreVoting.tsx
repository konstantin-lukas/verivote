import React, { useState } from "react";

import VoteButton from "@/components/routes/poll/VoteButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/data/types";
import { useModal } from "@/hooks";
import { submitVote } from "@/utils";

const colorSteps = [
    "#f43f5e",
    "#f55752",
    "#f76a46",
    "#f88d3a",
    "#f9b230",
    "#f9d727",
    "#d3e242",
    "#a7e75d",
    "#74eb7a",
    "#12d4ae",
];

function PollOption({ children, scores, setScores, idx, disabled }: {
    children: React.ReactNode,
    scores: number[],
    setScores: (scores: number[]) => void,
    idx: number,
    disabled: boolean,
}) {
    return (
        <li className="relative mt-6 flex items-center gap-6 last:mb-4" data-cy="pollOption">
            <span className="pointer-events-none absolute left-8 top-1/2 w-[calc(100%-8.5rem)] translate-y-[calc(-50%-0.05rem)]
            overflow-hidden text-ellipsis text-nowrap">
                {children}
            </span>
            <input
                type="range"
                min={1}
                max={10}
                step={1}
                disabled={disabled}
                value={scores[idx]}
                onChange={(e) => {
                    const copy = [...scores];
                    copy[idx] = parseInt(e.target.value);
                    setScores(copy);
                }}
                className="w-full"
            />
            <div>
                <span className="relative block size-10 rounded-full" style={{ backgroundColor: colorSteps[scores[idx] - 1] }}>
                    <span className="center-absolute font-bold text-white">{scores[idx]}</span>
                </span> 
            </div>
        </li>
    );
}

export default function ScoreVoting({ poll, setHasVoted }: { poll: Poll, setHasVoted: (v: boolean) => void }) {
    const [scores, setScores] = useState(poll.options.map(() => 1));
    const [modal, setModal] = useModal();
    const [disabled, setDisabled] = useState(false);
    return (
        <form method="POST" className="my-24" onSubmit={e => {
            submitVote(
                e,
                setModal,
                setDisabled,
                setHasVoted,
                { pollId: poll.id, selection: scores },
            );
        }}>
            {modal}
            <H3>Assign each choice a score</H3>
            <span>Rate each choice separately based on how much you like it</span>
            <ul className="mt-4">
                {poll.options.map((x, i) => <PollOption disabled={disabled} key={i} idx={i} scores={scores} setScores={setScores}>{x}</PollOption>)}
            </ul>
            <VoteButton disabled={disabled}/>
        </form>
    );
}