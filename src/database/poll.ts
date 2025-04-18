import { ObjectId } from "bson";

import mongo from "@/database/connection";
import type { Poll } from "@/types/poll";
import { makeBSONSerializable } from "@/utils/server";
import { tryCatch } from "@/utils/shared";

function getCollection() {
    const db = mongo.db("verivote");
    return db.collection("polls");
}

export async function findPollById(id: string) {
    const polls = getCollection();
    const { data, error } = await tryCatch(polls.findOne<Poll>({ _id: new ObjectId(id) }));
    if (error) return null;
    return makeBSONSerializable(data);
}

export async function deletePollByIdAndUserIdentifier(id: string, userIdentifier: string) {
    const polls = getCollection();
    const { data, error } = await tryCatch(polls.deleteOne({ _id: new ObjectId(id), userIdentifier }));
    return !error && data.deletedCount === 1;
}

export async function findPollsByUserIdentifier(userIdentifier: string) {
    const polls = getCollection();
    const { data, error } = await tryCatch(polls.find<Poll>({ userIdentifier }).toArray());
    if (error) return [];
    return data.map(datum => makeBSONSerializable(datum));
}

export async function insertPoll(poll: Poll) {
    const polls = getCollection();
    const { data, error } = await tryCatch(polls.insertOne(poll));
    if (error) return null;
    return data.insertedId.toString();
}
