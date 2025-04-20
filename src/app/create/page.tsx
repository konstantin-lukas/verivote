import type { Metadata } from "next";
import React from "react";

import CreatePollForm from "@/components/forms/CreatePollForm";
import Wrapper from "@/components/layout/Wrapper";
import H1 from "@/components/typography/H1";
import { VOTING_METHODS } from "@/const/misc";

export const metadata: Metadata = {
    title: "Create - Verivote",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
    const { type } = await searchParams;
    return (
        <Wrapper className="min-h-main-height-mobile desktop:min-h-main-height flex flex-col items-center justify-center">
            <H1 className="mt-28">Create a poll</H1>
            <CreatePollForm defaultMethod={VOTING_METHODS.find(m => m.shorthand === type)?.dbId} />
        </Wrapper>
    );
}
