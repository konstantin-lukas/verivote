import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import ManageCards from "@/components/routes/manage/ManageCards";
import Wrapper from "@/components/shared/Wrapper";
import { findPollByUserIdentifier } from "@/database/poll";
import type { Poll } from "@/types/poll";
import { getUserIdentifier } from "@/utils";

export const metadata: Metadata = {
    title: "Manage - Verivote",
};

export default async function Page() {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) {
        notFound();
    }
    console.log(userIdentifier);
    const polls: Poll[] = await findPollByUserIdentifier(userIdentifier);

    return (
        <Wrapper className="min-h-[var(--main-height-mobile)] py-24 desktop:min-h-[var(--main-height)]">
            <ManageCards polls={polls} />
        </Wrapper>
    );
}
