import type { Metadata } from "next";
import React from "react";

import ManageCards from "@/components/routes/manage/ManageCards";
import Wrapper from "@/components/shared/Wrapper";
import type { Poll } from "@/types/poll";

export const metadata: Metadata = {
    title: "Manage - Verivote",
};

export default async function Page() {
    const polls: Poll[] = [];

    return (
        <Wrapper className="min-h-[var(--main-height-mobile)] py-24 desktop:min-h-[var(--main-height)]">
            <ManageCards defaultPolls={polls} />
        </Wrapper>
    );
}
