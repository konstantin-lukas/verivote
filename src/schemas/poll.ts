import { addMinutes } from "date-fns";
import { z } from "zod";

import { MAX_POLL_OPTION_TITLE_LENGTH, MAX_POLL_OPTIONS, MAX_POLL_TITLE_LENGTH } from "@/const/poll";
import { AuthProvider } from "@/enum/auth";
import { VotingMethod } from "@/enum/poll";

export const PollOptionSchema = z
    .string({ message: "Each option's name must be string" })
    .min(1, { message: "Each option's name must be at least one character long" })
    .max(MAX_POLL_OPTION_TITLE_LENGTH, {
        message: `Each option's name must be no longer than ${MAX_POLL_OPTION_TITLE_LENGTH} characters`,
    });

export const PollTitleSchema = z
    .string({ message: "The poll must have a title" })
    .min(1, { message: "The poll title has to be at least one character long" })
    .max(MAX_POLL_TITLE_LENGTH, {
        message: `The poll title has to be no longer than ${MAX_POLL_TITLE_LENGTH} characters`,
    });

export const PollClosingTimeSchema = z
    .date({ message: "The closing time must be a valid date" })
    .refine(date => date >= addMinutes(new Date(), 1), {
        message: "The closing time has to be at least one minute from now",
    });

export const PollCreateClientSchema = z.object({
    title: PollTitleSchema,
    closingTime: PollClosingTimeSchema,
    options: z
        .array(PollOptionSchema, { message: "The poll must have options" })
        .min(2, { message: "A poll needs at least two options" })
        .max(MAX_POLL_OPTIONS, {
            message: `A poll can have no more than ${MAX_POLL_OPTIONS} options.`,
        }),
    winnerNeedsMajority: z.boolean({
        message: "The information whether this poll's winner needs a majority is missing",
    }),
});

export const PollCreateServerSchema = PollCreateClientSchema.extend({
    userIdentifier: z
        .string({ message: "The user identifier has to be a string" })
        .regex(new RegExp(`\\w+(${Object.values(AuthProvider).join("|")})$`), {
            message: "An invalid user identifier was provided",
        }),
    creationTime: z.date({ message: "The creation time has to be a valid date" }).refine(date => date <= new Date(), {
        message: "The creation time cannot lie in the future",
    }),
    votingMethod: z.nativeEnum(VotingMethod, { message: "No valid voting method was provided" }),
    votes: z.array(
        z.object({
            ip: z
                .string({ message: "No IP address was provided" })
                .ip({ message: "The provided IP address is invalid" }),
            selection: z.array(
                z.number({ message: "A choice has to be selected by its order in the list of options" }),
                { message: "A vote must have a selection of choices" },
            ),
        }),
        { message: "The poll must have a list of votes" },
    ),
});
