"use client";

import React, { useState } from "react";

import BlockButton from "@/components/shared/BlockButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/data/types";

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

function PollOption({ children, scores, setScores, idx }: {
    children: React.ReactNode,
    scores: number[],
    setScores: (scores: number[]) => void,
    idx: number,
}) {
    return (
        <li className="relative mt-6 flex items-center gap-6 last:mb-4">
            <span className="pointer-events-none absolute left-8 top-1/2 w-[calc(100%-8.5rem)] translate-y-[calc(-50%-0.05rem)]
            overflow-hidden text-ellipsis text-nowrap">
                {children}
            </span>
            <input
                type="range"
                min={1}
                max={10}
                step={1}
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

export default function ScoreVoting({ poll }: { poll: Poll }) {
    const [scores, setScores] = useState(poll.Options.map(() => 1));

    return (
        <form method="POST" className="my-24">
            <H3>Assign each choice a score</H3>
            <span>Rate each choice separately based on how much you like it</span>
            <ul className="mt-4">
                {poll.Options.map((x, i) => <PollOption key={i} idx={i} scores={scores} setScores={setScores}>{x}</PollOption>)}
            </ul>
            <BlockButton className="mt-8 w-full" type="submit">
                Vote
            </BlockButton>
        </form>
    );
}