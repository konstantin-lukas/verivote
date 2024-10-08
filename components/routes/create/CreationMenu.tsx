"use client";

import "./CreationMenu.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import React, { useReducer } from "react";

import Dropdown from "@/components/shared/Dropdown";
import Input from "@/components/shared/Input";
import type { CreationFormState } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

function reducer(state: CreationFormState, action: {type: string; value: string}) {
    if (action.type === "method") return { ...state, method: action.value };
    if (action.type === "name") return { ...state, name: action.value };
    if (action.type === "date") {
        if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(action.value)) return { ...state, date: action.value };
    }
    return { ...state };
}

export default function CreationMenu() {
    const [state, dispatch] = useReducer(reducer, {
        method: votingMethods[0].name,
        name: "",
        date: (new Date()).toISOString().split("T")[0],
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
            {/*<DatePicker
                id="date"
                selected={new Date(state.date)}
                onKeyDown={(e) => {
                    e.preventDefault();
                }}
                showTimeInput
                showTimeSelect
                showTimeCaption
                dateFormat="dd/MM/YYYY HH:mm:ss"
                timeIntervals={15}
                minDate={new Date()}
                customInput={
                    <input type="text" className="rounded-full bg-neutral-100 px-10 py-2 shadow-3d-inset
                    dark:bg-neutral-900 dark:shadow-dark-3d-inset" disabled/>
                }
                onChange={(e) => dispatch({type: "date", value: e?.toISOString() ?? new Date().toISOString()})}
            />*/}
        </div>
    );
}