import type { Metadata } from "next";
import React from "react";

import InfoCard from "@/components/routes/(info-pages)/InfoCard";
import { votingMethods } from "@/content/votingMethods";
import type { VotingMethod } from "@/types";

export const metadata: Metadata = {
    title: "Instant-Runoff Voting - Verivote",
    description: votingMethods.find(x => x.name === "Instant-Runoff")?.shortDescription,
};

export default async function Page() {
    return <InfoCard votingMethod={votingMethods.find(x => x.name === "Instant-Runoff") as VotingMethod} />;
}
