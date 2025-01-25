import type { Metadata } from "next";
import React from "react";

import CreationForm from "@/components/form/CreationForm";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import { votingMethods } from "@/content/votingMethods";

export const metadata: Metadata = {
    title: "Create - Verivote",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
    const type = (await searchParams).type;
    return (
        <Wrapper
            className="flex min-h-[var(--main-height-mobile)] flex-col items-center justify-center
            desktop:min-h-[var(--main-height)]"
        >
            <H1 className="mt-28">Create a poll</H1>
            <CreationForm defaultMethod={votingMethods.find(m => m.shorthand === type)?.dbId} />
        </Wrapper>
    );
}
