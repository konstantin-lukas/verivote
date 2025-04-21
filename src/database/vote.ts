import { ObjectId } from "bson";

import type { Vote } from "@/types/vote";
import { getPollCollection } from "@/utils/server";
import { tryCatch } from "@/utils/shared";

export async function insertVoteByPollId(pollId: string, vote: Vote) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(
        polls.updateOne(
            { _id: new ObjectId(pollId), votes: { $not: { $elemMatch: { ip: vote.ip } } } },
            { $push: { votes: vote } },
        ),
    );
    return !error && data?.matchedCount === 1;
}

export async function doesVoteExist(pollId: string, ip: string) {
    const polls = getPollCollection();
    const { data } = await tryCatch(polls.findOne({ _id: new ObjectId(pollId), votes: { $elemMatch: { ip } } }));
    return !!data;
}
