"use client";

import "./CreationMenu.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import React, { useMemo, useReducer } from "react";
import { IoAddSharp } from "react-icons/io5";

import Checkbox from "@/components/form/Checkbox";
import Dropdown from "@/components/form/Dropdown";
import Input from "@/components/form/Input";
import type { CreationFormState } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

function reducer(
    state: CreationFormState,
    { type, value, index }: {type: string; value?: string | boolean, index?: number},
) {
    if (type === "method") return { ...state, method: value as string };
    if (type === "name") return { ...state, name: value as string };
    if (type === "date") return { ...state, date: value as string };
    if (type === "majority") return { ...state, needsMajority: value as boolean };
    if (type === "optionsChange") {
        const copy = { ...state, options: [...state.options]};
        copy.options[index as number] = value as string;
        return copy;
    }
    if (type === "optionsAdd") {
        const copy = { ...state, options: [...state.options]};
        copy.options.push("");
        return copy;
    }

    return { ...state };
}

export default function CreationMenu() {
    const [state, dispatch] = useReducer(reducer, {
        method: votingMethods[0].name,
        name: "",
        date: (new Date()).toISOString().split("T")[0],
        needsMajority: false,
        options: ["", ""],
    });

    const options = useMemo(() => {
        return state.options.map((o, i) => {
            return (
                <Input
                    value={o}
                    key={i}
                    setValue={value => dispatch({ type: "optionsChange", value, index: i })}
                    placeholder={"Option " + (i + 1)}
                    className="mt-4"
                />
            );
        });
    }, [state]);

    return (
        <div className="mx-auto mt-24 inline-flex flex-col">
            <Dropdown
                options={votingMethods.map(m => m.name)}
                defaultOption={0}
                getValue={(index: number) => dispatch({ type: "method", value: votingMethods[index].name })}
                ariaLabel={"Select poll type"}
            />
            <Input
                value={state.name}
                setValue={value => dispatch({ type: "name", value })}
                placeholder="Poll name"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                    value={new Date(state.date)}
                    minDate={new Date()}
                    ampmInClock
                    onChange={(e) => dispatch({ type: "date", value: e?.toISOString() ?? new Date().toISOString() })}
                />
            </LocalizationProvider>
            <Checkbox
                onChange={(e) => dispatch({ type: "majority", value: e.target.checked })}
                checked={state.needsMajority}
                label="Winner needs majority: "
            />
            {options}
            <button
                className="group mx-auto mt-6 flex size-10 items-center justify-center rounded-full shadow-3d
                transition-shadow hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both"
                onClick={() => dispatch({ type: "optionsAdd" })}
            >
                <IoAddSharp className="size-7 transition-transform group-hover:scale-90"/>
            </button>
        </div>
    );
}