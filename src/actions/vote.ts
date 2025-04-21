"use server";

import { findPollById } from "@/database/poll";
import { insertVoteByPollId } from "@/database/vote";
import { VotingMethod } from "@/enum/poll";
import {
    ApprovalVoteCreateSchema,
    PluralityVoteCreateSchema,
    RankedVoteCreateSchema,
    ScoreVoteCreateSchema,
} from "@/schemas/vote";
import type { ActionResult } from "@/types/result";
import type { Vote } from "@/types/vote";
import { getIpAddress } from "@/utils/server";
import { parseSchema } from "@/utils/shared";

export async function createVote(pollId: string, selection: number[]): ActionResult<string> {
    const [ip, poll] = await Promise.all([getIpAddress(), findPollById(pollId)]);
    if (!poll) return { data: null, error: ["Unknown poll ID"] };
    let schema;
    switch (poll.votingMethod) {
        case VotingMethod.PLURALITY_VOTING:
            schema = PluralityVoteCreateSchema(poll.options.length);
            break;
        case VotingMethod.SCORE_VOTING:
            schema = ScoreVoteCreateSchema(poll.options.length);
            break;
        case VotingMethod.APPROVAL_VOTING:
            schema = ApprovalVoteCreateSchema(poll.options.length);
            break;
        default:
            schema = RankedVoteCreateSchema(poll.options.length);
            break;
    }
    const vote = {
        ip,
        selection,
    };
    const errors = parseSchema(schema, vote);
    if (errors) return { data: null, error: errors };
    const ok = await insertVoteByPollId(pollId, vote as Vote);
    if (!ok) return { data: null, error: ["The vote could not be registered"] };

    return { data: "Vote registered successfully", error: null };
}
