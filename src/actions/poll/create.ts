"use server";

import { getServerSession } from "next-auth";

import type { CreationFormState } from "@/types";

export default async function createPoll(formData: CreationFormState) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return { ok: false, message: "Invalid credentials." };
    }
    console.log(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ok: true, message: "Poll created successfully." };
}
