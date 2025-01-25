import type { VotingMethod } from "@/enums";

export interface Poll {
    creationTime?: Date;
    closingTime: Date;
    userIdentifier?: string;
    title: string;
    options: string[];
    winnerNeedsMajority: boolean;
    votingMethod: VotingMethod;
}

export interface PollSummary {
    title: string;
    votingMethod: VotingMethod;
    voterCount: number;
    winners: number[];
    options: string[];
    results: number[];
    closingDate: string;
}
