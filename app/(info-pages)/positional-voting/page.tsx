import type { Metadata } from "next";
import React from "react";

import InfoCard from "@/components/routes/(info-pages)/InfoCard";
import type { VotingMethod } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

export const metadata: Metadata = {
    title: "Positional Voting - Verivote",
    description: votingMethods.find(x => x.name === "Positional Voting")?.shortDescription,
};

export default async function Page() {
    return (
        <InfoCard votingMethod={votingMethods.find(x => x.name === "Positional Voting") as VotingMethod}/>
    );
}