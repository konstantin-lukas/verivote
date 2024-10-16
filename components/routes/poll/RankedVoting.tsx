import "./RankedVoting.css";

import React, { useEffect, useRef, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdDragIndicator } from "react-icons/md";
// eslint-disable-next-line import/no-named-as-default
import Sortable from "sortablejs";

import VoteButton from "@/components/routes/poll/VoteButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/data/types";
import { useModal } from "@/hooks";
import { submitVote } from "@/utils";

function PollOption({ children, id, sortable, options, setOptions, disabled }: {
    children: React.ReactNode,
    id: string,
    sortable?: Sortable,
    options: string[],
    setOptions: (s: string[]) => void,
    disabled: boolean,
}) {
    return (
        <li className="flex select-none gap-4 py-3" draggable={false} data-id={id} style={{ cursor: disabled ? "wait" : "move" }}>
            <span
                className="relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100 px-10
                py-2 shadow-3d-inset placeholder:text-neutral-500 dark:bg-neutral-900 dark:shadow-dark-3d-inset"
            >
                <MdDragIndicator className="absolute left-4 top-1/2 size-4 -translate-y-1/2"/>
                <span>{children}</span>
            </span>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    disabled={disabled}
                    className="group relative size-8 rounded-full shadow-3d transition-shadow
                    hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both"
                    onClick={() => {
                        if (!sortable) return;
                        const arrayCopy = [...options];
                        const lastIndex = arrayCopy.length - 1;
                        const index = arrayCopy.findIndex(x => x === id);
                        const element = arrayCopy[index];
                        arrayCopy.splice(index, 1);
                        arrayCopy.splice(index === 0 ? lastIndex : index - 1, 0, element);
                        sortable.sort(arrayCopy, true);
                        setOptions(arrayCopy);
                    }}
                >
                    <MdArrowUpward className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-90"/>
                </button>
                <button
                    type="button"
                    disabled={disabled}
                    className="group relative size-8 rounded-full shadow-3d transition-shadow
                    hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both"
                    onClick={() => {
                        if (!sortable) return;
                        const arrayCopy = [...options];
                        const lastIndex = arrayCopy.length - 1;
                        const index = arrayCopy.findIndex(x => x === id);
                        const element = arrayCopy[index];
                        arrayCopy.splice(index, 1);
                        arrayCopy.splice(index === lastIndex ? 0 : index + 1, 0, element);
                        sortable.sort(arrayCopy, true);
                        setOptions(arrayCopy);
                    }}
                >
                    <MdArrowDownward className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-90"/>
                </button>
            </div>
        </li>
    );
}

export default function RankedVoting({ poll, setHasVoted }: { poll: Poll, setHasVoted: (v: boolean) => void }) {
    const [options, setOptions] = useState(poll.options.map((_, i) => i.toString()));
    const [sortable, setSortable] = useState<Sortable>();
    const [disabled, setDisabled] = useState(false);

    const list = useRef(null);
    useEffect(() => {
        if (!list.current || disabled) return;
        const s = Sortable.create(list.current, { animation: 150 });
        s.options.onUpdate = () => setOptions(s.toArray());
        setSortable(s);
        return () => {
            if (s) s.destroy();
        };
    }, [disabled]);
    const [modal, setModal] = useModal();

    return (
        <form method="POST" className="my-24" onSubmit={e => {
            submitVote(
                e,
                setModal,
                setDisabled,
                setHasVoted,
                { pollId: poll.id, selection: options.map(x => parseInt(x, 10)) },
            );
        }}>
            {modal}
            <H3>Rank the choices by preference</H3>
            <span>Favorite at the top, least favorite at the bottom</span>
            <ul ref={list} className="mt-4">
                {poll.options.map((x, i) => {
                    return (
                        <PollOption key={i} id={i.toString()} sortable={sortable} options={options} disabled={disabled}
                            setOptions={setOptions}>
                            {x}
                        </PollOption>
                    );
                })}
            </ul>
            <VoteButton disabled={disabled}/>
        </form>
    );
}