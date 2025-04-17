import type { Metadata } from "next";
import React from "react";

import CreationForm from "@/components/forms/CreationForm";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import { votingMethods } from "@/content/votingMethods";

export const metadata: Metadata = {
    title: "Create - Verivote",
};

export default async function Page({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
    const { type } = await searchParams;
    return (
        <Wrapper className="min-h-main-height-mobile desktop:min-h-main-height flex flex-col items-center justify-center">
            <H1 className="mt-28">Create a poll</H1>
            <CreationForm defaultMethod={votingMethods.find(m => m.shorthand === type)?.dbId} />
        </Wrapper>
    );
}
