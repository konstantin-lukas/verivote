import type { z } from "zod";

import type { PollCreateServerSchema } from "@/schemas/poll";

export type Poll = z.infer<typeof PollCreateServerSchema> & { id: string };

export type PollFormState = Pick<Poll, "votingMethod" | "title" | "closingTime" | "winnerNeedsMajority" | "options">;

export interface PollResult {
    voterCount: number;
    winners: number[];
    options: string[];
    results: number[];
}
