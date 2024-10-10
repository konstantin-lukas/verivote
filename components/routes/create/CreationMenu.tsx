"use client";

import "./CreationMenu.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import type { ReactNode } from "react";
import React, { useMemo, useReducer, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";

import Checkbox from "@/components/form/Checkbox";
import Dropdown from "@/components/form/Dropdown";
import Input from "@/components/form/Input";
import BlockButton from "@/components/shared/BlockButton";
import Modal from "@/components/shared/Modal";
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
    if (type === "optionsDelete") {
        const copy = { ...state, options: [...state.options]};
        copy.options.splice(index as number, 1);
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

    const [disableForm, setDisableForm] = useState(false);

    const options = useMemo(() => {
        return state.options.map((o, i) => {
            return (
                <div key={i} className="relative mt-4">
                    <Input
                        value={o}
                        disabled={disableForm}
                        className="w-full"
                        setValue={value => dispatch({ type: "optionsChange", value, index: i })}
                        placeholder={"Option " + (i + 1)}
                    />
                    {i > 1 && (
                        <button
                            className="group absolute right-4 top-1/2 -translate-y-1/2"
                            onClick={() => dispatch({ type: "optionsDelete", index: i })}
                            disabled={disableForm}
                        >
                            <IoMdClose className="size-6 transition-colors group-hover:text-rose-500"/>
                        </button>
                    )}
                </div>
            );
        });
    }, [state, disableForm]);

    const [modal, setModal] = useState<ReactNode>(null);

    return (
        <form
            method="POST"
            className="relative mx-auto mb-24 mt-12 inline-flex flex-col"
            onSubmit={async (e) => {
                e.preventDefault();
                setDisableForm(true);
                const apiOrigin = process.env.NEXT_PUBLIC_API_ORIGIN;
                if (!apiOrigin) {
                    setDisableForm(false);
                    setModal(
                        <Modal
                            onClose={() => setModal(null)}
                            closeButtonText="Got it"
                        >The api origin wasn&#39;t set by the developer. Cannot submit form.</Modal>,
                    );
                }
                //const result = fetch();
            }}
        >
            {modal}
            <Dropdown
                options={votingMethods.map(m => m.name)}
                defaultOption={0}
                disabled={disableForm}
                getValue={(index: number) => dispatch({ type: "method", value: votingMethods[index].name })}
                ariaLabel={"Select poll type"}
            />
            <Input
                value={state.name}
                disabled={disableForm}
                setValue={value => dispatch({ type: "name", value })}
                placeholder="Poll name"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                    value={new Date(state.date)}
                    minDate={new Date()}
                    ampmInClock
                    onChange={(e) => dispatch({ type: "date", value: e?.toISOString() ?? new Date().toISOString() })}
                    disabled={disableForm}
                />
            </LocalizationProvider>
            <Checkbox
                onChange={(e) => dispatch({ type: "majority", value: e.target.checked })}
                checked={state.needsMajority}
                label="Winner needs majority: "
                disabled={disableForm}
            />
            {options}
            <div className="mt-6 flex gap-6">
                { state.options.length < parseInt(process.env.NEXT_PUBLIC_MAX_OPTIONS_PER_POLL ?? "20") && (
                    <button
                        className="group flex size-10 items-center justify-center rounded-full shadow-3d
                        transition-shadow hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both"
                        onClick={() => {
                            dispatch({ type: "optionsAdd" });
                            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                        }}
                        type="button"
                        disabled={disableForm}
                    >
                        <IoAddSharp className="size-7 transition-transform group-hover:scale-90"/>
                    </button>
                )}
                <BlockButton className="grow" type="submit" disabled={disableForm}>
                    Create
                </BlockButton>
            </div>
            {
                disableForm && (
                    <>
                        <div
                            className="pointer-events-none absolute left-1/2 top-1/2 box-content size-full -translate-x-1/2
                            -translate-y-1/2 bg-neutral-100/50 p-4 dark:bg-neutral-900/50"
                        />
                        <div
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100 p-4
                            shadow-vague dark:bg-neutral-900 dark:shadow-dark-vague"
                        >
                            <AiOutlineLoading3Quarters className="size-20 animate-spin text-verivote-turquoise"/>
                        </div>
                    </>
                )
            }
        </form>
    );
}