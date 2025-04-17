import { getServerSession } from "next-auth";

import { Provider } from "@/enums";

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
