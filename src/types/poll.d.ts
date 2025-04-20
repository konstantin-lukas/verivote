import type { z } from "zod";

import type { VotingMethod } from "@/enum/poll";
import type { PollCreateServerSchema } from "@/schemas/poll";

export type Poll = z.infer<typeof PollCreateServerSchema> & { id: string };

export type PollFormState = Pick<Poll, "votingMethod" | "title" | "closingTime" | "winnerNeedsMajority" | "options">;

export interface PollSummary {
    title: string;
    votingMethod: VotingMethod;
    voterCount: number;
    winners: number[];
    options: string[];
    results: number[];
    closingDate: Date;
}
