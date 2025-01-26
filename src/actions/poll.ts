"use server";

import { ObjectId } from "bson";
import { redirect } from "next/navigation";

import mongo from "@/database/connection";
import { insertPoll } from "@/database/poll";
import type { Poll } from "@/types/poll";
import { getUserIdentifier } from "@/utils";
import { validatePoll } from "@/validation/poll";

export async function createPoll(formData: Poll) {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) {
        return { ok: false, message: "Invalid credentials." };
    }

    const newPoll: Poll = {
        creationTime: new Date(),
        closingTime: formData.closingTime,
        userIdentifier,
        title: formData.title,
        options: formData.options,
        winnerNeedsMajority: formData.winnerNeedsMajority,
        votingMethod: formData.votingMethod,
    };

    if (!validatePoll(newPoll)) {
        return { ok: false, message: "Invalid form values." };
    }

    let id;
    try {
        id = await insertPoll(newPoll);
    } catch {
        return { ok: false, message: "An unknown error occurred." };
    }
    redirect(`/poll/${id}`);
}

/**
 * @returns whether the poll was deleted
 */
export async function deletePoll(id: string) {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return false;

    const database = mongo.db("verivote");
    const polls = database.collection("polls");
    const result = await polls.deleteOne({ _id: new ObjectId(id), userIdentifier });
    return result.deletedCount === 1;
}
