"use client";

import React, { useEffect, useReducer } from "react";

import Dropdown from "@/components/shared/Dropdown";
import Input from "@/components/shared/Input";
import type { CreationFormState } from "@/data/types";
import { votingMethods } from "@/data/votingMethods";

function reducer(state: CreationFormState, action: {type: string; value: string}) {
    if (action.type === "method") return { ...state, method: action.value };
    if (action.type === "name") return { ...state, name: action.value };
    return { ...state };
}

export default function CreationMenu() {
    const [state, dispatch] = useReducer(reducer, { method: votingMethods[0].name, name: "" });
    useEffect(() => {
        console.log(state);
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
        </div>
    );
}