import { notFound } from "next/navigation";
import React from "react";

import ShareButton from "@/components/routes/poll/ShareButton";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;
    if (id !== "123") notFound();

    return (
        <Wrapper className="flex min-h-[var(--main-height-mobile)] flex-col items-center py-24 desktop:min-h-[var(--main-height)]">
            <H1 customSizes="text-2xl sm:text-3xl md:text-4xl" className="text-center">What should we have for dinner? What should we have for dinner?</H1>
            <h2 className="text-xl font-bold text-dark-font dark:text-light-font">Instant-Runoff Voting</h2>

            <ShareButton url="https://google.com"/>
        </Wrapper>
    );
}