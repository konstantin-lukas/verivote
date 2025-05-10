import type { Metadata } from "next";

import InfoPage from "@/components/informational/InfoPage";
import { VOTING_METHODS } from "@/const/misc";

export const metadata: Metadata = {
    title: "Positional Voting - Verivote",
    description: VOTING_METHODS.find(x => x.name === "Positional Voting")?.shortDescription,
};

export default async function Page() {
    return <InfoPage votingMethod={VOTING_METHODS.find(x => x.name === "Positional Voting")!} />;
}
