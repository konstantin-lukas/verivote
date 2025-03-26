import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import ManageCards from "@/components/routes/manage/ManageCards";
import Wrapper from "@/components/shared/Wrapper";
import { findPollsByUserIdentifier } from "@/database/poll";
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
    const polls: Poll[] = await findPollsByUserIdentifier(userIdentifier);

    return (
        <Wrapper className="min-h-main-height-mobile py-24 desktop:min-h-main-height">
            <ManageCards polls={polls} />
        </Wrapper>
    );
}
