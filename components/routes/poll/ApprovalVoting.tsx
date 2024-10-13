"use client";

import React, { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import BlockButton from "@/components/shared/BlockButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/data/types";

function PollOption({ children, scores, setScores, idx }: {
    children: React.ReactNode,
    scores: boolean[],
    setScores: (scores: boolean[]) => void,
    idx: number,
}) {
    const toggle = () => {
        const copy = [...scores];
        copy[idx] = !copy[idx];
        setScores(copy);
    };
    return (
        <li className="py-3">
            <label className="flex cursor-pointer">
                <input
                    type="checkbox"
                    checked={scores[idx]}
                    onChange={toggle}
                    className="peer hidden"
                />
                <span
                    className="relative mr-4 block size-10 shrink-0 grow rounded-full bg-red-500
                    peer-checked:bg-verivote-turquoise"
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={scores[idx]}
                    onKeyDown={e => {if (e.key === "Enter") toggle();}}
                >
                    {scores[idx] && <IoMdCheckmark className="center-absolute size-6 text-white"/>}
                    {!scores[idx] && <IoMdClose className="center-absolute size-6 text-white"/>}
                </span>
                <span
                    className="relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100
                    px-10 py-2 shadow-3d-inset placeholder:text-neutral-500 dark:bg-neutral-900 dark:shadow-dark-3d-inset"
                >
                    {children}
                </span>
            </label>
        </li>
    );
}

export default function ScoreVoting({ poll }: { poll: Poll }) {
    const [scores, setScores] = useState(poll.Options.map(() => false));

    return (
        <form method="POST" className="my-24">
            <H3>Check all choices you approve</H3>
            <span>You can check as many options as you like</span>
            <ul className="mt-4">
                {poll.Options.map((x, i) => <PollOption key={i} idx={i} scores={scores} setScores={setScores}>{x}</PollOption>)}
            </ul>
            <BlockButton className="mt-8 w-full" type="submit">
                Vote
            </BlockButton>
        </form>
    );
}