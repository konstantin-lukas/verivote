import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { RiEditLine } from "react-icons/ri";

import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import H2 from "@/components/shared/H2";
import Wrapper from "@/components/shared/Wrapper";
import type { Poll } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";
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
                <BlockLink href={`/manage/${poll.id}`} className="mt-6 flex w-full justify-center">
                    <RiEditLine className="mr-1 inline translate-y-[-0.05em]"/>
                    <span>Edit</span>
                </BlockLink>
            </div>
        </div>
    );
}

export default async function Page() {

    const auth = cookies().get("next-auth.session-token")?.value;
    const response = await fetch(process.env.LOCAL_API_ORIGIN + "/polls", {
        credentials: "same-origin",
        headers: { Cookie: "next-auth.session-token=" + auth },
    });
    if (!response.ok) {
        notFound();
    }
    const polls: Poll[] = await response.json();
    return (
        <Wrapper className="mb-16">
            <div className="my-24 flex justify-center">
                <H1>Edit your polls</H1>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
                {polls.map(x => <PollCard key={x.id} poll={x} />)}
            </div>
        </Wrapper>
    );
}