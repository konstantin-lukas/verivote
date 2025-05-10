"use server";

import { INVALID_CREDENTIALS_ERROR } from "@/const/error";
import { deletePollsByUserIdentifier } from "@/database/poll";
import { getUserIdentifier } from "@/utils/server";

export async function deleteAccount() {
    const userIdentifier = await getUserIdentifier();
    if (!userIdentifier) return { data: null, error: [INVALID_CREDENTIALS_ERROR] };
    await deletePollsByUserIdentifier(userIdentifier);
    return {
        data: true,
        error: null,
    };
}
