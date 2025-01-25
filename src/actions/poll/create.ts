"use server";

import { getServerSession } from "next-auth";

import mongo from "@/database";
import type { CreationFormState } from "@/types";

export default async function createPoll(formData: CreationFormState) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return { ok: false, message: "Invalid credentials." };
    }

    const db = mongo.db("verivote");
    const polls = db.collection("polls");
    await polls.insertOne({
        creationTime: new Date(),
        openUntil: formData.date,
        userIdentifier: session.user.email,
        name: formData.name,
        options: formData.options,
        majority: formData.needsMajority,
        method: formData.method,
    });

    return { ok: true, message: "Poll created successfully." };
}
