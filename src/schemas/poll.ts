import { addMinutes } from "date-fns";
import { z } from "zod";

import { UNKNOWN_SERVER_ERROR } from "@/const/error";
import { MAX_POLL_OPTIONS } from "@/const/poll";
import { AuthProvider } from "@/enum/auth";

export const PollOptionSchema = z
    .string({ message: "Each option's name must be string" })
    .min(1, { message: "Each option's name must be at least one character long" })
    .max(100, { message: "Each option's name must be no longer than 100 characters" });

export const PollTitleSchema = z
    .string()
    .min(1, { message: "The poll title has to be at least one character long" })
    .max(200, { message: "The poll title has to be no longer than 200 characters" });

export const PollClosingTimeSchema = z
    .date({ message: "The closing time must be a valid date" })
    .refine(date => date >= addMinutes(new Date(), 1), {
        message: "The closing time has to be at least one minute from now",
    });

export const PollCreateClientSchema = z.object({
    title: PollTitleSchema,
    closingTime: PollClosingTimeSchema,
    options: z
        .array(PollOptionSchema)
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
        .string({ message: UNKNOWN_SERVER_ERROR })
        .regex(new RegExp(`\\w+(${Object.values(AuthProvider).join("|")})$`), { message: UNKNOWN_SERVER_ERROR }),
    creationTime: z.date({ message: UNKNOWN_SERVER_ERROR }).max(new Date(), { message: UNKNOWN_SERVER_ERROR }),
});
