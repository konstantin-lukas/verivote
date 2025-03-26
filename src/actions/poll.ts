"use server";

import { ObjectId } from "bson";
import { redirect } from "next/navigation";

import mongo from "@/database/connection";
import { insertPoll } from "@/database/poll";
import type { ActionResult } from "@/types";
import type { Poll } from "@/types/poll";
import { getUserIdentifier, tryCatch } from "@/utils";
import { validatePoll } from "@/validation/poll";

export async function createPoll(formData: Poll): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) {
        return [false, "Invalid credentials."];
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
        return [false, "Invalid form values."];
    }

    const [id, error] = await tryCatch(insertPoll(newPoll));
    if (error) return [false, "An unknown error occurred."];
    redirect(`/poll/${id}`);
}

export async function deletePoll(id: string): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return [false, "Invalid credentials."];

    const database = mongo.db("verivote");
    const polls = database.collection("polls");
    const result = await polls.deleteOne({ _id: new ObjectId(id), userIdentifier });
    const success = result.deletedCount === 1;
    return [success, success ? "Poll successfully deleted." : "Poll not found."];
}
