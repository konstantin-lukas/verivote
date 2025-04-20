import { ObjectId } from "bson";

import type { Poll } from "@/types/poll";
import { getPollCollection, makeBSONSerializable } from "@/utils/server";
import { tryCatch } from "@/utils/shared";

export async function findPollById(id: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(polls.findOne<Poll>({ _id: new ObjectId(id) }));
    if (error) return null;
    return makeBSONSerializable(data);
}

export async function deletePollByIdAndUserIdentifier(id: string, userIdentifier: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(polls.deleteOne({ _id: new ObjectId(id), userIdentifier }));
    return !error && data.deletedCount === 1;
}

export async function findPollsByUserIdentifier(userIdentifier: string) {
    const polls = getPollCollection();
    const { data, error } = await tryCatch(polls.find<Poll>({ userIdentifier }).toArray());
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
