import { ObjectId } from "bson";

import type { Poll } from "@/types/poll";
import { getPollCollection, makeBSONSerializable } from "@/utils/server";
import { tryCatch } from "@/utils/shared";

export async function findPollById(id: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(
        (async () =>
            polls.findOne<Poll>(
                { _id: new ObjectId(id) },
                { projection: { userIdentifier: false, votes: { ip: false } } },
            ))(),
    );
    if (error || !data) return null;
    return makeBSONSerializable(data);
}

export async function hasIpVotedOnPoll(pollId: string, ip: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(
        (async () => polls.countDocuments({ _id: new ObjectId(pollId), votes: { $elemMatch: { ip } } }))(),
    );
    return !!(error || data > 0);
}

export async function deletePollByIdAndUserIdentifier(id: string, userIdentifier: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch((async () => polls.deleteOne({ _id: new ObjectId(id), userIdentifier }))());
    return !error && data.deletedCount === 1;
}

export async function findPollsByUserIdentifier(userIdentifier: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(
        polls.find<Poll>({ userIdentifier }, { projection: { userIdentifier: false, votes: { ip: false } } }).toArray(),
    );
    if (error) return [];
    return data.map(datum => makeBSONSerializable(datum));
}

export async function insertPoll(poll: Omit<Poll, "id">) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(polls.insertOne(poll));
    if (error) return null;
    return data.insertedId.toString();
}

export async function deletePollsByUserIdentifier(userIdentifier: string) {
    const polls = getPollCollection();
    const { error } = await tryCatch(polls.deleteMany({ userIdentifier }));
    return !error;
}
