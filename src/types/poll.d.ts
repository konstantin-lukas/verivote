import type { ObjectId } from "bson";

import type { VotingMethod } from "@/enum/poll";

export interface Poll {
    _id?: ObjectId;
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
    closingDate: Date;
}
