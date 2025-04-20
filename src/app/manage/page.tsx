import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import UpdatePollsForm from "@/components/forms/UpdatePollsForm";
import Wrapper from "@/components/layout/Wrapper";
import { findPollsByUserIdentifier } from "@/database/poll";
import type { Poll } from "@/types/poll";
import { getUserIdentifier } from "@/utils/server";

export const metadata: Metadata = {
    title: "Manage - Verivote",
};

export default async function Page() {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) notFound();
    const polls: Poll[] = await findPollsByUserIdentifier(userIdentifier);

    return (
        <Wrapper className="min-h-main-height-mobile desktop:min-h-main-height py-24">
            <UpdatePollsForm polls={polls} />
        </Wrapper>
    );
}
