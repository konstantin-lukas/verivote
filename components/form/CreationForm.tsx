"use client";

import "./CreationForm.css";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { addDays, formatRFC3339, setSeconds } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useReducer, useState } from "react";
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
import { useModal } from "@/hooks";

function reducer(
    state: CreationFormState,
    { type, value, index }: {type: string; value?: string | boolean | Date | number, index?: number},
) {
    if (type === "method") return { ...state, method: value as number };
    if (type === "name") return { ...state, name: value as string };
    if (type === "date") return { ...state, date: formatRFC3339(setSeconds(value as Date, 0)) };
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



export default function CreationForm({ defaultMethod }: { defaultMethod?: number }) {
    const [state, dispatch] = useReducer(reducer, {
        method: defaultMethod ?? votingMethods[0].dbId,
        name: "",
        date: "",
        needsMajority: true,
        options: ["", ""],
    });

    const [disableForm, setDisableForm] = useState(false);

    /**
     * This effect is used instead of an initial value for the date to prevent a very rate hydration error.
     * The hours and minutes of the date are displayed by the material ui datetime picker.
     * If a client makes a request at the end of a minute and the response arrives in the next minute, the displayed
     * HTML will differ. Setting an empty string as a date prevents that because the initial value is static.
     */
    useEffect(() => {
        dispatch({ type: "date", value: formatRFC3339(setSeconds(addDays(new Date(), 1), 0)) });
    }, []);

    const options = useMemo(() => {
        return state.options.map((o, i) => {
            return (
                <div key={i} className="relative mt-4">
                    <Input
                        value={o}
                        disabled={disableForm}
                        className="w-full"
                        name={"options[]"}
                        maxLength={100}
                        required={true}
                        setValue={value => dispatch({ type: "optionsChange", value, index: i })}
                        placeholder={"Option " + (i + 1)}
                    />
                    {i > 1 && (
                        <button
                            className="group absolute right-4 top-1/2 -translate-y-1/2"
                            onClick={() => dispatch({ type: "optionsDelete", index: i })}
                            disabled={disableForm}
                            type="button"
                        >
                            <IoMdClose className="size-6 transition-colors group-hover:text-rose-500"/>
                        </button>
                    )}
                </div>
            );
        });
    }, [state, disableForm]);

    const [modal, setModal] = useModal();
    const router = useRouter();

    return (
        <form
            method="post"
            action={process.env.NEXT_PUBLIC_API_ORIGIN + "/poll"}
            className="relative mx-auto mb-24 mt-12 inline-flex w-full flex-col sm:w-auto"
            onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setDisableForm(true);

                const formData = new URLSearchParams();
                formData.set("name", state.name);
                formData.set("date", state.date);
                if (state.needsMajority) formData.set("majority", "on");
                state.options.forEach(o => {
                    formData.append("options[]", o);
                });
                formData.set("votingMethod", state.method.toString());

                try {
                    const response = await fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/poll", {
                        credentials: "include",
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData,
                    });
                    if (!response.ok) {
                        setDisableForm(false);
                        setModal(
                            <Modal closeButtonText="Got it">
                                An error occurred while sending your request. Please try again later.
                            </Modal>,
                        );
                        return;
                    }

                    const location = response.headers.get("Location");
                    if (!process.env.NEXT_PUBLIC_ORIGIN || !location?.startsWith(process.env.NEXT_PUBLIC_ORIGIN + "/poll")) {
                        setDisableForm(false);
                        setModal(
                            <Modal closeButtonText="Got it">
                                The server created your poll but responded with an invalid location. This could be a
                                technical issue. Please only follow this link if it is on our server: <br/>
                                {location}
                            </Modal>,
                        );
                    } else {
                        router.push(location);
                    }
                } catch {
                    setDisableForm(false);
                    setModal(
                        <Modal closeButtonText="Got it">
                            A network error occurred. Unable to submit form. Please try again later.
                        </Modal>,
                    );
                }
            }}
        >
            {modal}
            <Dropdown
                options={votingMethods.map(m => m.name)}
                defaultOption={votingMethods.findIndex(v => v.dbId === (defaultMethod ?? votingMethods[0].dbId))}
                disabled={disableForm}
                getValue={(index: number) => dispatch({ type: "method", value: votingMethods[index].dbId })}
                ariaLabel={"Select poll type"}
            />
            <Input
                value={state.name}
                name="name"
                required={true}
                maxLength={200}
                disabled={disableForm}
                setValue={value => dispatch({ type: "name", value })}
                placeholder="Poll name"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                    value={new Date(state.date)}
                    minDate={new Date()}
                    ampmInClock
                    onChange={(date) => dispatch({ type: "date", value: date ?? new Date() })}
                    disabled={disableForm}
                />
            </LocalizationProvider>
            <Checkbox
                onChange={(e) => dispatch({ type: "majority", value: e.target.checked })}
                checked={state.needsMajority}
                label="Winner needs majority: "
                disabled={disableForm}
                name="majority"
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