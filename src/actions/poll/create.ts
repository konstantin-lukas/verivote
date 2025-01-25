"use server";

import { getServerSession } from "next-auth";

import mongo from "@/database";
import type { CreationFormState } from "@/types";

export default async function createPoll(formData: CreationFormState) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return { ok: false, message: "Invalid credentials." };
    }
    const username = encodeURIComponent(process.env.MONGODB_USER!);
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD!);
    const uri = `mongodb://${username}:${password}@${process.env.MONGODB_URI!}/?authMechanism=DEFAULT`;
    console.log(uri);
    const db = mongo.db("verivote");
    const polls = db.collection("polls");
    await polls.insertOne({ test: "Hello, world!" });

    await new Promise(resolve => setTimeout(resolve, 1000));
    return { ok: true, message: "Poll created successfully." };
}
