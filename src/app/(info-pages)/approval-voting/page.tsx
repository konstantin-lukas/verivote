import type { Metadata } from "next";
import React from "react";

import InfoPage from "@/components/routes/(info-pages)/InfoPage";
import { VOTING_METHODS } from "@/const/misc";

export const metadata: Metadata = {
    title: "Approval Voting - Verivote",
    description: VOTING_METHODS.find(x => x.name === "Approval Voting")?.shortDescription,
};

export default async function Page() {
    return <InfoPage votingMethod={VOTING_METHODS.find(x => x.name === "Approval Voting")!} />;
}
