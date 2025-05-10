"use server";

import { redirect } from "next/navigation";

import { INVALID_CREDENTIALS_ERROR } from "@/const/error";
import { deletePollByIdAndUserIdentifier, findPollById, insertPoll } from "@/database/poll";
import { PollCreateServerSchema } from "@/schemas/poll";
import type { Poll, PollFormState } from "@/types/poll";
import type { ActionResult } from "@/types/result";
import { getUserIdentifier } from "@/utils/server";
import { parseSchema, tryCatch } from "@/utils/shared";

export async function createPoll({
    closingTime,
    title,
    options,
    winnerNeedsMajority,
    votingMethod,
}: PollFormState): ActionResult<string> {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { data: null, error: [INVALID_CREDENTIALS_ERROR] };

    const newPoll = {
        creationTime: new Date(),
        votes: [],
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
    if (error || data === null) return { data: null, error: ["An error occurred while creating poll"] };
    redirect(`/poll/${data}`);
}

export async function deletePoll(id: string): ActionResult<string> {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { data: null, error: [INVALID_CREDENTIALS_ERROR] };
    const ok = await deletePollByIdAndUserIdentifier(id, userIdentifier);
    if (ok) return { data: "Poll successfully deleted", error: null };
    return { data: null, error: ["An error occurred while deleting the poll"] };
}

export async function getPoll(id: string): ActionResult<Poll> {
    const poll = await findPollById(id);
    if (!poll) return { data: null, error: ["Poll not found"] };
    return { data: poll, error: null };
}
