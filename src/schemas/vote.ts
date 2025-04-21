import { z } from "zod";

import { NO_IP_ADDRESS } from "@/const/error";
import { isValidApprovalSelection, isValidRankedSelection, isValidScoreSelection } from "@/utils/validation";

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

export const RankedVoteCreateSchema = z.object({
    ip: IPSchema,
    selection: SelectionBaseSchema.refine(isValidRankedSelection, { message: "The selection contains invalid values" }),
});

export const ScoreVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.refine(selection => isValidScoreSelection(selection, optionCount), {
            message: "The selection contains invalid values",
        }),
    });

export const ApprovalVoteCreateSchema = (optionCount: number) =>
    z.object({
        ip: IPSchema,
        selection: SelectionBaseSchema.min(1, { message: "You have to vote for at least one choice" }).refine(
            selection => isValidApprovalSelection(selection, optionCount),
            { message: "The selection contains invalid values" },
        ),
    });

export const PluralityVoteCreateSchema = z.object({
    ip: IPSchema,
    selection: SelectionBaseSchema.refine(() => undefined, { message: "The selection contains invalid values" }),
});
