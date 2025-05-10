import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";

import ErrorList from "@/components/alert/ErrorList";
import Snackbar from "@/components/alert/Snackbar";
import VoteButton from "@/components/interaction/VoteButton";
import H3 from "@/components/typography/H3";
import useCreateVote from "@/hooks/actions/useCreateVote";
import type { Poll } from "@/types/poll";

function PollOption({
    children,
    selected,
    setSelected,
    idx,
    disabled,
}: {
    children: ReactNode;
    selected: boolean[];
    setSelected: (scores: boolean[]) => void;
    idx: number;
    disabled: boolean;
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
                    className="peer-checked:bg-verivote-turquoise relative mr-4 block size-10 shrink-0 grow rounded-full bg-red-500"
                    role="checkbox"
                    tabIndex={0}
                    aria-checked={selected[idx]}
                    onKeyDown={e => {
                        if (e.key === "Enter") toggle();
                    }}
                >
                    {selected[idx] && <IoMdCheckmark className="center-absolute size-6 text-white" />}
                    {!selected[idx] && <IoMdClose className="center-absolute size-6 text-white" />}
                </span>
                <span className="inset-shadow-3d dark:inset-shadow-dark-3d relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100 px-10 py-2 transition-all placeholder:text-neutral-500 dark:bg-neutral-900">
                    {children}
                </span>
            </label>
        </li>
    );
}

export default function ApprovalVotingForm({
    poll,
    setSuccessMessage,
}: {
    poll: Poll;
    setSuccessMessage: (v: string) => void;
}) {
    const [selected, setSelected] = useState(poll.options.map(() => false));
    const [disabled] = useState(false);
    const { pending, action, error, data } = useCreateVote(
        poll.id,
        selected.reduce((array, bool, i) => {
            if (bool) array.push(i);
            return array;
        }, [] as number[]),
    );
    const errorList = useMemo(() => error && <ErrorList errors={error} />, [error]);
    useEffect(() => {
        if (!pending && data) setSuccessMessage(data);
    }, [pending, data, setSuccessMessage]);
    return (
        <form className="my-24" action={action}>
            <H3>Check all choices you approve</H3>
            <span>You can check as many options as you like</span>
            <ul className="mt-4">
                {poll.options.map((x, i) => (
                    <PollOption key={i} disabled={disabled} idx={i} selected={selected} setSelected={setSelected}>
                        {x}
                    </PollOption>
                ))}
            </ul>
            <VoteButton disabled={disabled} />
            <Snackbar message={errorList} />
        </form>
    );
}
