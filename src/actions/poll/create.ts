"use server";

import { getServerSession } from "next-auth";

import mongo from "@/database";
import type { CreationFormState, Poll } from "@/types/poll";
import { validatePoll } from "@/validation/poll";

export default async function createPoll(formData: CreationFormState) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return { ok: false, message: "Invalid credentials." };
    }

    const newPoll: Poll = {
        creationTime: new Date(),
        closingTime: formData.closingTime,
        userIdentifier: session.user.email,
        title: formData.title,
        options: formData.options,
        winnerNeedsMajority: formData.winnerNeedsMajority,
        votingMethod: formData.votingMethod,
    };

    if (!validatePoll(newPoll)) {
        return { ok: false, message: "Invalid form values." };
    }

    const db = mongo.db("verivote");
    const polls = db.collection("polls");
    await polls.insertOne(newPoll);

    return { ok: true, message: "Poll created successfully." };
}
