import React, { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import VoteButton from "@/components/routes/poll/VoteButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/types/poll";

function PollOption({
    children,
    selected,
    setSelected,
    idx,
}: {
    children: React.ReactNode;
    selected: number;
    setSelected: (idx: number) => void;
    idx: number;
}) {
    return (
        <li className="py-3" data-cy="pollOption">
            <label className="flex cursor-pointer">
                <input
                    type="radio"
                    name="choice"
                    className="peer hidden"
                    checked={selected === idx}
                    onChange={e => {
                        if (e.target.checked) setSelected(idx);
                    }}
                />
                <span
                    className="relative mr-4 block size-10 shrink-0 grow rounded-full bg-red-500
                    peer-checked:bg-verivote-turquoise"
                    role="radio"
                    tabIndex={0}
                    aria-label={children as string}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            setSelected(idx);
                        }
                    }}
                    aria-checked={selected === idx}
                >
                    {selected === idx && <IoMdCheckmark className="center-absolute size-6 text-white" />}
                    {selected !== idx && <IoMdClose className="center-absolute size-6 text-white" />}
                </span>
                <span
                    className="relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100
                    px-10 py-2 shadow-3d-inset transition-all placeholder:text-neutral-500 dark:bg-neutral-900 dark:shadow-dark-3d-inset"
                >
                    {children}
                </span>
            </label>
        </li>
    );
}

export default function PluralityVoting({ poll }: { poll: Poll; setHasVoted: (v: boolean) => void }) {
    const [selected, setSelected] = useState(-1);
    const [disabled] = useState(false);
    return (
        <form method="POST" className="my-24">
            <H3>Check the choice you like the most</H3>
            <span>You can only choose one option</span>
            <ul className="mt-4">
                {poll.options.map((x, i) => (
                    <PollOption key={i} idx={i} selected={selected} setSelected={setSelected}>
                        {x}
                    </PollOption>
                ))}
            </ul>
            <VoteButton disabled={disabled} />
        </form>
    );
}
