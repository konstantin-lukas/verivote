import { z } from "zod";

import { INVALID_CHOICES, NO_IP_ADDRESS } from "@/const/error";
import {
    isValidApprovalSelection,
    isValidPluralitySelection,
    isValidRankedSelection,
    isValidScoreSelection,
} from "@/utils/validation";

const IPSchema = z.string({ message: NO_IP_ADDRESS }).ip({ message: "The provided IP address is invalid" });
const SelectionBaseSchema = z.array(
    z.number({ message: "A choice has to be selected by its order in the list of options" }),
    {
        message: "A vote must have a selection of choices",
    },
);

export const BaseVoteCreateSchema = z.object({
    ip: IPSchema,
    selection: SelectionBaseSchema,
});

export const RankedVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.length(optionCount, { message: "You have to rank all choices" }).refine(
            isValidRankedSelection,
            { message: INVALID_CHOICES },
        ),
    });

export const ScoreVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.refine(selection => isValidScoreSelection(selection, optionCount), {
            message: INVALID_CHOICES,
        }),
    });

export const ApprovalVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.min(1, { message: "You have to vote for at least one choice" }).refine(
            selection => isValidApprovalSelection(selection, optionCount),
            { message: INVALID_CHOICES },
        ),
    });

export const PluralityVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.length(1, { message: "You have to select exactly one choice" }).refine(
            selection => isValidPluralitySelection(selection, optionCount - 1),
            { message: INVALID_CHOICES },
        ),
    });
