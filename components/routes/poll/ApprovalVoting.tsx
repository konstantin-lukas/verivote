import React, { useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import VoteButton from "@/components/routes/poll/VoteButton";
import H3 from "@/components/shared/H3";
import Modal from "@/components/shared/Modal";
import type { Poll } from "@/data/types";
import { useModal } from "@/hooks";
import { submitVote } from "@/utils";

function PollOption({ children, selected, setSelected, idx, disabled }: {
    children: React.ReactNode,
    selected: boolean[],
    setSelected: (scores: boolean[]) => void,
    idx: number,
    disabled: boolean,
}) {
    const toggle = () => {
        const copy = [...selected];
        copy[idx] = !copy[idx];
        setSelected(copy);
    };
    return (
        <li className="py-3">
            <label className="flex" style={{ cursor: disabled ? "wait" : "pointer" }}>
                <input
                    type="checkbox"
                    checked={selected[idx]}
                    onChange={toggle}
                    className="peer hidden"
                    disabled={disabled}
                />
                <span
                    className="relative mr-4 block size-10 shrink-0 grow rounded-full bg-red-500
                    peer-checked:bg-verivote-turquoise"
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={selected[idx]}
                    onKeyDown={e => {if (e.key === "Enter") toggle();}}
                >
                    {selected[idx] && <IoMdCheckmark className="center-absolute size-6 text-white"/>}
                    {!selected[idx] && <IoMdClose className="center-absolute size-6 text-white"/>}
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

export default function ApprovalVoting({ poll, setHasVoted }: { poll: Poll, setHasVoted: (v: boolean) => void }) {
    const [selected, setSelected] = useState(poll.options.map(() => false));
    const [modal, setModal] = useModal();
    const [disabled, setDisabled] = useState(false);
    return (
        <form method="POST" className="my-24" onSubmit={e => {
            if (selected.filter(x => x).length === 0) {
                e.preventDefault();
                e.stopPropagation();
                setModal(
                    <Modal closeButtonText="Got it">
                        Please choose at least one option.
                    </Modal>,
                );
                return;
            }
            submitVote(
                e,
                setModal,
                setDisabled,
                setHasVoted,
                { pollId: poll.id, selection: selected.map((v, i) => v ? i : -1).filter(x => x > -1) },
            );
        }}>
            {modal}
            <H3>Check all choices you approve</H3>
            <span>You can check as many options as you like</span>
            <ul className="mt-4">
                {poll.options.map((x, i) => <PollOption key={i} disabled={disabled} idx={i} selected={selected} setSelected={setSelected}>{x}</PollOption>)}
            </ul>
            <VoteButton disabled={disabled}/>
        </form>
    );
}