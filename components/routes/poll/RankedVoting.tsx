"use client";
import "./RankedVoting.css";

import React, { useEffect, useRef, useState } from "react";
import { MdDragIndicator } from "react-icons/md";
import Sortable from "sortablejs";

import BlockButton from "@/components/shared/BlockButton";
import H3 from "@/components/shared/H3";
import type { Poll } from "@/data/types";

function PollOption({ children, id }: { children: React.ReactNode, id: string }) {
    return (
        <li className="cursor-move select-none py-3" draggable={false} data-id={id}>
            <span
                className="relative block w-full overflow-hidden text-ellipsis text-nowrap rounded-full bg-neutral-100 px-10
                py-2 shadow-3d-inset placeholder:text-neutral-500 dark:bg-neutral-900 dark:shadow-dark-3d-inset"
            >
                <MdDragIndicator  className="absolute left-4 top-1/2 size-4 -translate-y-1/2"/>
                <span>{children}</span>
            </span>
        </li>
    );
}

export default function RankedVoting({ poll }: { poll: Poll }) {
    const [options, setOptions] = useState(poll.Options);

    const list = useRef(null);
    useEffect(() => {
        if (!list.current) return;
        const s = Sortable.create(list.current, {
            animation: 150,
        });
        s.options.onChange = () => setOptions(s.toArray());
        return () => s.destroy();
    }, []);
    
    return (
        <form method="POST" className="my-24">
            <H3>Rank the choices by preference</H3>
            <span>Favorite at the top, least favorite at the bottom</span>
            <ul ref={list} className="mt-4">
                {poll.Options.map((x, i) => <PollOption key={i} id={i.toString()}>{x}</PollOption>)}
            </ul>
            <BlockButton className="mt-8 w-full" type="submit">
                Vote
            </BlockButton>
        </form>
    );
}