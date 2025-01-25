import { addMinutes } from "date-fns";

import type { Poll } from "@/types/poll";

export function validateTitle(name: string) {
    return name.length > 0 && name.length <= 200;
}

export function validateOption(name: string) {
    return name.length > 0 && name.length <= 100;
}

export function validateClosingTime(date: Date) {
    return date >= addMinutes(new Date(), 1);
}

export function validateCreationTime(date?: Date) {
    if (!date) return false;
    return date <= new Date();
}

export function validateOptions(options: string[]) {
    const maxOptions = parseInt(process.env.NEXT_PUBLIC_MAX_OPTIONS_PER_POLL ?? "20");
    if (options.length === 1 || options.length > maxOptions) return false;
    for (const option of options) {
        if (!validateOption(option)) {
            return false;
        }
    }
    return true;
}

export function validateUserIdentifier(userIdentifier?: string) {
    if (!userIdentifier) return false;
    const providers = ["github", "reddit", "discord"];
    for (const provider of providers) {
        if (userIdentifier.endsWith(provider)) return true;
    }
    return false;
}

export function validatePoll(poll: Poll) {
    return (
        validateTitle(poll.title) &&
        validateOptions(poll.options) &&
        validateClosingTime(poll.closingTime) &&
        validateUserIdentifier(poll.userIdentifier) &&
        validateCreationTime(poll.creationTime)
    );
}
