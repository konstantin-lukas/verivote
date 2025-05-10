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
}: {
    children: ReactNode;
    selected: number;
    setSelected: (idx: number) => void;
    idx: number;
}) {
    return (
        <li className="py-3">
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
                    className="peer-checked:bg-verivote-turquoise relative mr-4 block size-10 shrink-0 grow rounded-full bg-red-500"
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
                <span className="inset-shadow-3d dark:inset-shadow-dark-3d relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100 px-10 py-2 transition-all placeholder:text-neutral-500 dark:bg-neutral-900">
                    {children}
                </span>
            </label>
        </li>
    );
}

export default function PluralityVotingForm({
    poll,
    setSuccessMessage,
}: {
    poll: Poll;
    setSuccessMessage: (v: string) => void;
}) {
    const [selected, setSelected] = useState(-1);
    const [disabled] = useState(false);
    const { pending, action, error, data } = useCreateVote(poll.id, selected < 0 ? [] : [selected]);
    const errorList = useMemo(() => error && <ErrorList errors={error} />, [error]);
    useEffect(() => {
        if (!pending && data) setSuccessMessage(data);
    }, [pending, data, setSuccessMessage]);
    return (
        <form action={action} className="my-24">
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
            <Snackbar message={errorList} />
        </form>
    );
}
