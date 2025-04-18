"use server";

import { ObjectId } from "bson";
import { redirect } from "next/navigation";

import { INVALID_CREDENTIALS_ERROR } from "@/const/error";
import mongo from "@/database/connection";
import { insertPoll } from "@/database/poll";
import { PollCreateServerSchema } from "@/schemas/poll";
import type { Poll } from "@/types/poll";
import type { ActionResult } from "@/types/result";
import { getUserIdentifier } from "@/utils/server";
import { parseSchema, tryCatch } from "@/utils/shared";

export async function createPoll(formData: Poll): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) {
        return { successMessage: null, errorMessages: [INVALID_CREDENTIALS_ERROR] };
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

    const errors = parseSchema(PollCreateServerSchema, newPoll);
    if (errors) return { successMessage: null, errorMessages: errors };

    const { data, error } = await tryCatch(insertPoll(newPoll));
    if (error) return { successMessage: null, errorMessages: ["An error occurred while creating poll"] };
    redirect(`/poll/${data}`);
}

export async function deletePoll(id: string): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { successMessage: null, errorMessages: [INVALID_CREDENTIALS_ERROR] };

    const database = mongo.db("verivote");
    const polls = database.collection("polls");
    const result = await polls.deleteOne({ _id: new ObjectId(id), userIdentifier });
    const success = result.deletedCount === 1;
    if (success) return { successMessage: "Poll successfully deleted.", errorMessages: null };
    return { successMessage: null, errorMessages: ["Poll not found."] };
}
