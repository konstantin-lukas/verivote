"use server";

import { redirect } from "next/navigation";

import { INVALID_CREDENTIALS_ERROR } from "@/const/error";
import { deletePollByIdAndUserIdentifier, insertPoll } from "@/database/poll";
import { PollCreateServerSchema } from "@/schemas/poll";
import type { Poll } from "@/types/poll";
import type { ActionResult } from "@/types/result";
import { getUserIdentifier } from "@/utils/server";
import { parseSchema, tryCatch } from "@/utils/shared";

export async function createPoll({
    closingTime,
    title,
    options,
    winnerNeedsMajority,
    votingMethod,
}: Poll): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) {
        return { data: null, error: [INVALID_CREDENTIALS_ERROR] };
    }

    const newPoll: Poll = {
        creationTime: new Date(),
        closingTime,
        userIdentifier,
        title,
        options,
        winnerNeedsMajority,
        votingMethod,
    };

    const errors = parseSchema(PollCreateServerSchema, newPoll);
    if (errors) return { data: null, error: errors };

    const { data, error } = await tryCatch(insertPoll(newPoll));
    if (error) return { data: null, error: ["An error occurred while creating poll"] };
    redirect(`/poll/${data}`);
}

export async function deletePoll(id: string): ActionResult {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { data: null, error: [INVALID_CREDENTIALS_ERROR] };
    const ok = await deletePollByIdAndUserIdentifier(id, userIdentifier);
    if (ok) return { data: "Poll successfully deleted", error: null };
    return { data: null, error: ["An error occurred while deleting the poll"] };
}
