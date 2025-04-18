import type { Metadata } from "next";
import React from "react";

import InfoCard from "@/components/routes/(info-pages)/InfoCard";
import { VOTING_METHODS } from "@/const/misc";

export const metadata: Metadata = {
    title: "Approval Voting - Verivote",
    description: VOTING_METHODS.find(x => x.name === "Approval Voting")?.shortDescription,
};

export default async function Page() {
    return <InfoCard votingMethod={VOTING_METHODS.find(x => x.name === "Approval Voting")!} />;
}
