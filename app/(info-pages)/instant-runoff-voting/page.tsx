import React from "react";

import InfoCard from "@/components/routes/(info-pages)/InfoCard";
import type { VotingMethod } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

export default async function Page() {
    return (
        <InfoCard votingMethod={votingMethods.find(x => x.name === "Instant-Runoff") as VotingMethod}/>
    );
}