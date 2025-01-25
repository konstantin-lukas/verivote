"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import insertPoll from "@/database/insertPoll";
import type { Poll } from "@/types/poll";
import { validatePoll } from "@/validation/poll";

export default async function create(formData: Poll) {
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

    let id;
    try {
        id = await insertPoll(newPoll);
    } catch {
        return { ok: false, message: "An unknown error occurred." };
    }
    redirect(`/poll/${id}`);
}
