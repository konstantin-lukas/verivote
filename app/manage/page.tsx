import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import ManageCards from "@/components/routes/manage/ManageCards";
import Wrapper from "@/components/shared/Wrapper";
import type { Poll } from "@/data/types";

export const metadata: Metadata = {
    title: "Manage - Verivote",
};

export default async function Page() {

    const auth = cookies().get("next-auth.session-token")?.value;
    const response = await fetch(process.env.LOCAL_API_ORIGIN + "/polls", {
        headers: { Cookie: "next-auth.session-token=" + auth },
    });
    if (!response.ok) {
        notFound();
    }
    const polls: Poll[] = await response.json();
    return (
        <Wrapper className="min-h-[var(--main-height-mobile)] py-24 desktop:min-h-[var(--main-height)]">
            <ManageCards defaultPolls={polls}/>
        </Wrapper>
    );
}