import { ObjectId } from "bson";

import mongo from "@/database/connection";
import type { Poll } from "@/types/poll";

export default async function findPoll(id: string) {
    try {
        const db = mongo.db("verivote");
        const polls = db.collection("polls");
        const poll = await polls.findOne<Poll>({ _id: new ObjectId(id) });
        if (!poll) {
            return null;
        }
        const objId = (poll as unknown as { _id: ObjectId })._id.toString();
        delete (poll as unknown as { _id?: ObjectId })._id;
        return { ...poll, id: objId };
    } catch {
        return null;
    }
}
