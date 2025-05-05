import type { ObjectId } from "bson";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import type { z } from "zod";

import mongo from "@/database/connection";
import { AuthProvider } from "@/enum/auth";
import type { PollCreateServerSchema } from "@/schemas/poll";

/**
 * @returns the user's identifier or null if the user is not logged in or the identifier is invalid.
 */
export async function getUserIdentifier() {
    const session = await getServerSession();
    let identifier = session?.user?.email;
    if (!identifier) identifier = session?.user?.name;
    if (!identifier) return null;
    const providers = Object.values(AuthProvider);
    const isValidIdentifier = providers.some(provider => identifier.endsWith(provider));
    if (!isValidIdentifier) return null;
    return identifier;
}

export function makeBSONSerializable<T>(obj: T): T {
    const objId = (obj as unknown as { _id: ObjectId })._id.toString();
    delete (obj as unknown as { _id?: ObjectId })._id;
    return { ...obj, id: objId };
}

/**
 * This function assumes that it's running behind a correctly configured reverse proxy to set the X-Real-IP header.
 * If that's not the case, modify the below function not to read any headers which can be set by the client.
 * More info: https://adam-p.ca/blog/2022/03/x-forwarded-for/
 */
export async function getIpAddress() {
    const h = await headers();
    let ip = h.get("X-Real-IP");
    if (!ip) {
        const xForwardedFor = h.get("X-Forwarded-For");
        if (xForwardedFor) {
            const ipList = xForwardedFor.split(",").map(ip => ip.trim());
            if (ipList.length > 0) {
                ip = ipList[ipList.length - 1];
            }
        }
    }

    if (ip && ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    if (ip === "::1") {
        ip = "127.0.0.1";
    }

    return ip;
}

export function getPollCollection() {
    const db = mongo.db("verivote");
    return db.collection<z.infer<typeof PollCreateServerSchema>>("polls");
}
