"use server";

import type { CreationFormState } from "@/types";

export default async function createPoll(formData: CreationFormState) {
    console.log(formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { ok: true };
}
