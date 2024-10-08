"use client";

import "./CreationMenu.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import React, { useReducer } from "react";

import Checkbox from "@/components/form/Checkbox";
import Dropdown from "@/components/form/Dropdown";
import Input from "@/components/form/Input";
import type { CreationFormState } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

function reducer(state: CreationFormState, action: {type: string; value: string | boolean}) {
    if (action.type === "method") return { ...state, method: action.value as string };
    if (action.type === "name") return { ...state, name: action.value as string };
    if (action.type === "date") return { ...state, date: action.value as string };
    if (action.type === "majority") return { ...state, needsMajority: action.value as boolean };

    return { ...state };
}

export default function CreationMenu() {
    const [state, dispatch] = useReducer(reducer, {
        method: votingMethods[0].name,
        name: "",
        date: (new Date()).toISOString().split("T")[0],
        needsMajority: false,
    });

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
            <Input
                value={""}
                setValue={() => {}}
                placeholder="Option 1"
                className="mt-4"
            />
            <Input
                value={""}
                setValue={() => {}}
                placeholder="Option 2"
                className="mt-4"
            />
        </div>
    );
}