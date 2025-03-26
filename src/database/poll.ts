import { ObjectId } from "bson";

import mongo from "@/database/connection";
import type { Poll } from "@/types/poll";
import { removeUnderscoreFromId } from "@/utils";

export async function findPollById(id: string) {
    try {
        const db = mongo.db("verivote");
        const polls = db.collection("polls");
        const poll = await polls.findOne<Poll>({ _id: new ObjectId(id) });
        if (!poll) return null;
        return removeUnderscoreFromId(poll);
    } catch {
        return null;
    }
}

export async function findPollsByUserIdentifier(userIdentifier: string) {
    try {
        const db = mongo.db("verivote");
        const polls = db.collection("polls");
        const result = await polls.find<Poll>({ userIdentifier }).toArray();
        return result.map(r => removeUnderscoreFromId(r));
    } catch {
        return [];
    }
}

export async function insertPoll(poll: Poll) {
    const db = mongo.db("verivote");
    const polls = db.collection("polls");
    const result = await polls.insertOne(poll);
    return result.insertedId.toString();
}
