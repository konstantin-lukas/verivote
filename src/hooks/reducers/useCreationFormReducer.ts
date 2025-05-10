import { setSeconds } from "date-fns";
import { useReducer } from "react";

import { VOTING_METHODS } from "@/const/misc";
import type { PollFormState } from "@/types/poll";

function creationFormReducer(
    state: PollFormState,
    {
        type,
        value,
        index,
    }: {
        type: string;
        value?: string | boolean | Date | number;
        index?: number;
    },
) {
    if (type === "method") return { ...state, votingMethod: value as number };
    if (type === "title") return { ...state, title: value as string };
    if (type === "date") return { ...state, closingTime: setSeconds(value as Date, 0) };
    if (type === "majority") return { ...state, winnerNeedsMajority: value as boolean };
    if (type === "optionsChange") {
        const copy = { ...state, options: [...state.options] };
        copy.options[index as number] = value as string;
        return copy;
    }
    if (type === "optionsAdd") {
        const copy = { ...state, options: [...state.options] };
        copy.options.push("");
        return copy;
    }
    if (type === "optionsDelete") {
        const copy = { ...state, options: [...state.options] };
        copy.options.splice(index as number, 1);
        return copy;
    }

    return { ...state };
}

export default function useCreationFormReducer(defaultMethod?: number) {
    return useReducer(creationFormReducer, {
        votingMethod: defaultMethod ?? VOTING_METHODS[0].dbId,
        title: "",
        closingTime: new Date(""),
        winnerNeedsMajority: false,
        options: ["", ""],
    });
}
