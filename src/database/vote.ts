import { ObjectId } from "bson";

import type { Vote } from "@/types/vote";
import { getPollCollection } from "@/utils/server";
import { tryCatch } from "@/utils/shared";

export async function insertVoteByPollId(pollId: string, vote: Vote) {
    const polls = getPollCollection();
    const { error } = await tryCatch(polls.updateOne({ _id: new ObjectId(pollId) }, { $push: { votes: vote } }));
    return !error;
}
