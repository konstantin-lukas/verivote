import type { ObjectId } from "bson";
import { format } from "date-fns";
import { getServerSession } from "next-auth";

import { Provider } from "@/enums";
import type { Result } from "@/types";
import type { Poll } from "@/types/poll";

export function formatDate(date: Date) {
    return format(date, "dd LLLL yyyy hh:mm aa (OOOO)");
}

/**
 * @returns the user's identifier or null if the user is not logged in or the identifier is invalid.
 */
export async function getUserIdentifier() {
    const session = await getServerSession();
    let identifier = session?.user?.email;
    if (!identifier) {
        identifier = session?.user?.name;
    }
    if (!identifier) return null;
    const providers = Object.values(Provider);
    const isValidIdentifier = providers.some(provider => identifier.endsWith(provider));
    if (!isValidIdentifier) return null;
    return identifier;
}

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error as E];
    }
}

export async function tryCatchSync<T, E = Error>(fn: () => T): Promise<Result<T, E>> {
    try {
        const data = fn();
        return [data, null];
    } catch (error) {
        return [null, error as E];
    }
}

export function removeUnderscoreFromId(poll: Poll) {
    const objId = (poll as unknown as { _id: ObjectId })._id.toString();
    delete (poll as unknown as { _id?: ObjectId })._id;
    return { ...poll, id: objId };
}
