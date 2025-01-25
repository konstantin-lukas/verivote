import type { VotingMethod } from "@/enums";

export interface CreationFormState {
    votingMethod: VotingMethod;
    title: string;
    closingTime: Date;
    winnerNeedsMajority: boolean;
    options: string[];
}

export interface Poll {
    creationTime: Date;
    closingTime: Date;
    userIdentifier: string;
    title: string;
    options: string[];
    winnerNeedsMajority: boolean;
    votingMethod: VotingMethod;
}

export interface PollSummary {
    title: string;
    method: number;
    voterCount: number;
    winners: number[];
    options: string[];
    results: number[];
    closingDate: string;
}
