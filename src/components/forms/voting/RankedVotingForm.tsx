import { useEffect, useMemo, useRef, useState } from "react";
import { MdArrowDownward, MdArrowUpward, MdDragIndicator } from "react-icons/md";
import { default as Sortable } from "sortablejs";

import ErrorList from "@/components/alert/ErrorList";
import Snackbar from "@/components/alert/Snackbar";
import VoteButton from "@/components/interaction/VoteButton";
import H3 from "@/components/typography/H3";
import useCreateVote from "@/hooks/actions/useCreateVote";
import type { Poll } from "@/types/poll";

function PollOption({
    children,
    id,
    sortable,
    options,
    setOptions,
    disabled,
}: {
    children: string;
    id: string;
    sortable?: Sortable;
    options: string[];
    setOptions: (s: string[]) => void;
    disabled: boolean;
}) {
    return (
        <li
            className="flex select-none gap-4 py-3"
            draggable={false}
            data-id={id}
            style={{ cursor: disabled ? "wait" : "move" }}
        >
            <span className="inset-shadow-3d dark:inset-shadow-dark-3d relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100 px-10 py-2 transition-all placeholder:text-neutral-500 dark:bg-neutral-900">
                <MdDragIndicator className="absolute left-4 top-1/2 size-4 -translate-y-1/2" />
                <span>{children}</span>
            </span>
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    disabled={disabled}
                    aria-label={`Move option labeled "${children}" up one spot`}
                    className="shadow-3d hover:enabled:shadow-3d-both dark:shadow-dark-3d dark:hover:enabled:shadow-dark-3d-both group relative size-8 rounded-full transition-shadow"
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
                    <MdArrowUpward className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:group-enabled:scale-90" />
                </button>
                <button
                    type="button"
                    disabled={disabled}
                    aria-label={`Move option labeled "${children}" up down spot`}
                    className="shadow-3d hover:enabled:shadow-3d-both dark:shadow-dark-3d dark:hover:enabled:shadow-dark-3d-both group relative size-8 rounded-full transition-shadow"
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
                    <MdArrowDownward className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:group-enabled:scale-90" />
                </button>
            </div>
        </li>
    );
}

export default function RankedVotingForm({
    poll,
    setSuccessMessage,
}: {
    poll: Poll;
    setSuccessMessage: (v: string) => void;
}) {
    const [options, setOptions] = useState(poll.options.map((_, i) => i.toString()));
    const [sortable, setSortable] = useState<Sortable>();
    const { pending, action, error, data } = useCreateVote(
        poll.id,
        options.map(o => +o),
    );

    const errorList = useMemo(() => error && <ErrorList errors={error} />, [error]);
    const list = useRef(null);
    useEffect(() => {
        if (!list.current || pending) return;
        const s = Sortable.create(list.current, { animation: 150 });
        s.options.onUpdate = () => setOptions(s.toArray());
        setSortable(s);
        return () => {
            if (s) s.destroy();
        };
    }, [pending]);
    useEffect(() => {
        if (!pending && data) setSuccessMessage(data);
    }, [pending, data, setSuccessMessage]);

    return (
        <form className="my-24" action={action}>
            <H3>Rank the choices by preference</H3>
            <span>Drag your favorite to the top, least favorite to the bottom</span>
            <ul ref={list} className="mt-4">
                {poll.options.map((x, i) => (
                    <PollOption
                        key={i}
                        id={i.toString()}
                        sortable={sortable}
                        options={options}
                        disabled={pending}
                        setOptions={setOptions}
                    >
                        {x}
                    </PollOption>
                ))}
            </ul>
            <VoteButton disabled={pending} />
            <Snackbar message={errorList} />
        </form>
    );
}
