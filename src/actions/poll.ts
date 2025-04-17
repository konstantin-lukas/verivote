"use server";

import { ObjectId } from "bson";
import { redirect } from "next/navigation";

import { UNKNOWN_SERVER_ERROR } from "@/const/error";
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

    const errors = parseSchema(PollCreateServerSchema, newPoll);
    if (errors) return { ok: false, message: UNKNOWN_SERVER_ERROR };

    const { data: id, error: e } = await tryCatch(insertPoll(newPoll));
    if (e) return { ok: false, message: UNKNOWN_SERVER_ERROR };
    redirect(`/poll/${id}`);
}

export async function deletePoll(id: string): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { ok: false, message: "Invalid credentials." };

    const database = mongo.db("verivote");
    const polls = database.collection("polls");
    const result = await polls.deleteOne({ _id: new ObjectId(id), userIdentifier });
    const success = result.deletedCount === 1;
    return { ok: success, message: success ? "Poll successfully deleted." : "Poll not found." };
}
