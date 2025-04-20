"use server";

import { NO_IP_ADDRESS } from "@/const/error";
import type { ActionResult } from "@/types/result";
import { getIpAddress } from "@/utils/server";

export async function createVote(): ActionResult<string> {
    const ip = await getIpAddress();
    await new Promise(resolve => {
        setTimeout(resolve, 10000);
    });
    if (!ip) return { data: null, error: [NO_IP_ADDRESS] };

    return { data: "success", error: null };
}
