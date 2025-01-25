import mongo from "@/database/connection";
import type { Poll } from "@/types/poll";

export default async function insertPoll(poll: Poll) {
    const db = mongo.db("verivote");
    const polls = db.collection("polls");
    const result = await polls.insertOne(poll);
    return result.insertedId.toString();
}
