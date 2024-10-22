"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LuBrush, LuEye } from "react-icons/lu";

import DeleteButton from "@/components/routes/manage/DeleteButton";
import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import H2 from "@/components/shared/H2";
import type { Poll } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";
import illustration from "@/public/undraw_the_search_s0xf.svg";
import { formatDate } from "@/utils";

function PollCard({ poll }: { poll: Poll }) {
    const info = votingMethods.find(x => x.dbId === poll.method);
    return (
        <div className="flex flex-col justify-between">
            <div>
                <H2>{poll.name}</H2>
                <span className="mb-2 block text-xl font-bold uppercase">{info?.name}</span>
                <p>Options: {poll.options.join(", ")}</p>
            </div>
            <div>
                <span>Closing date: {formatDate(new Date(poll.openUntil))}</span>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <BlockLink href={`/poll/${poll.id}`} className="mt-6 flex grow justify-center">
                        <LuEye className="mr-1 inline translate-y-[-0.1em]"/>
                        <span>View</span>
                    </BlockLink>
                    <DeleteButton id={poll.id} />
                </div>
            </div>
        </div>
    );
}

export default function ManageCards({ defaultPolls }: { defaultPolls: Poll[] }) {
    const [polls, setPolls] = useState(defaultPolls);
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/polls", {
            credentials: "include",
        }).then(async (res) => await res.json()).then(data => setPolls(data)).catch(() => { /* */ });
    });
    return (
        <>
            <div className="mb-8 flex justify-center">
                <H1>{polls.length === 0 ? "No polls found" : "Edit your polls"}</H1>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
                {polls.map(x => <PollCard key={x.id} poll={x} />)}
            </div>
            {polls.length === 0 && (
                <div className="flex w-full flex-col items-center justify-center">
                    <Image
                        src={illustration}
                        alt="A man holding a magnifying glass in front of a large mobile phone."
                        priority
                        draggable={false}
                        className="mb-16 h-auto w-1/2 max-w-60"
                    />
                    <BlockLink href="/create">
                        <LuBrush className="relative top-[-.1rem] inline" size="1rem"/>
                        <span className="ml-1">Create a poll</span>
                    </BlockLink>
                </div>
            )}
        </>
    );
}