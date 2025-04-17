"use client";

import "./CreationForm.css";

import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { addDays, addMinutes, setSeconds } from "date-fns";
import type { ReactNode } from "react";
import React, { useActionState, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";

import { createPoll } from "@/actions/poll";
import Checkbox from "@/components/inputs/Checkbox";
import Dropdown from "@/components/inputs/Dropdown";
import Input from "@/components/inputs/Input";
import BlockButton from "@/components/shared/BlockButton";
import Modal from "@/components/shared/Modal";
import { votingMethods } from "@/content/votingMethods";
import { LoadingStateContext } from "@/contexts";
import type { Poll } from "@/types/poll";
import { validateClosingTime, validateOption, validateOptions, validateTitle } from "@/validation/poll";

function reducer(
    state: Poll,
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

export default function CreationForm({ defaultMethod }: { defaultMethod?: number }) {
    const [state, dispatch] = useReducer(reducer, {
        votingMethod: defaultMethod ?? votingMethods[0].dbId,
        title: "",
        closingTime: new Date(""),
        winnerNeedsMajority: false,
        options: ["", ""],
    });
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);

    const [{ message }, formAction, formPending] = useActionState(createPoll.bind(null, state), {
        ok: false,
        message: "",
    });
    const { setIsLoading } = useContext(LoadingStateContext);
    useEffect(() => {
        setIsLoading(formPending);
    }, [formPending, setIsLoading]);

    /**
     * This effect is used instead of an initial value for the date to prevent a very rate hydration error.
     * The hours and minutes of the date are displayed by the material ui datetime picker.
     * If a client makes a request at the end of a minute and the response arrives in the next minute, the displayed
     * HTML will differ. Setting an empty string as a date prevents that because the initial value is static.
     */
    useEffect(() => {
        dispatch({
            type: "date",
            value: setSeconds(addDays(new Date(), 1), 0),
        });
    }, []);

    useEffect(() => {
        setModalMessage(message);
    }, [message]);

    const options = useMemo(() => {
        return state.options.map((o, i) => {
            return (
                <div key={i} className="relative mt-4">
                    <Input
                        value={o}
                        valid={validateOption(o)}
                        disabled={formPending}
                        className="w-full"
                        testId={`option${i}`}
                        name={"options"}
                        maxLength={100}
                        required={true}
                        setValue={value => dispatch({ type: "optionsChange", value, index: i })}
                        placeholder={`Option ${i + 1}`}
                    />
                    {i > 1 && (
                        <button
                            className="group absolute right-4 top-1/2 -translate-y-1/2"
                            onClick={() => dispatch({ type: "optionsDelete", index: i })}
                            disabled={formPending}
                            type="button"
                        >
                            <IoMdClose className="size-6 transition-colors group-hover:text-rose-500" />
                        </button>
                    )}
                </div>
            );
        });
    }, [state, formPending]);

    const pollTypeSelect = (
        <Dropdown
            options={votingMethods.map(m => m.name)}
            defaultOption={votingMethods.findIndex(v => v.dbId === (defaultMethod ?? votingMethods[0].dbId))}
            disabled={formPending}
            getValue={(index: number) =>
                dispatch({
                    type: "method",
                    value: votingMethods[index].dbId,
                })
            }
            ariaLabel="Select poll type"
        />
    );

    const pollName = (
        <Input
            value={state.title}
            name="title"
            testId="title"
            valid={validateTitle(state.title)}
            required={true}
            maxLength={200}
            disabled={formPending}
            setValue={value => dispatch({ type: "title", value })}
            placeholder="Poll title"
        />
    );

    const datePicker = (
        <MobileDateTimePicker
            value={state.closingTime}
            minDateTime={addMinutes(new Date(), 1)}
            ampmInClock
            onChange={date => dispatch({ type: "date", value: date ?? new Date() })}
            disabled={formPending}
        />
    );

    const needsMajorityCheckbox = (
        <Checkbox
            testId="majority"
            onChange={e => dispatch({ type: "majority", value: e.target.checked })}
            checked={state.winnerNeedsMajority}
            label="Winner needs majority: "
            disabled={formPending}
            name="majority"
        />
    );

    const formButtons = (
        <div className="mt-6 flex gap-6">
            {state.options.length < parseInt(process.env.NEXT_PUBLIC_MAX_OPTIONS_PER_POLL ?? "20") && (
                <button
                    className="group flex size-10 items-center justify-center rounded-full shadow-3d
                        transition-shadow hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both"
                    onClick={() => {
                        dispatch({ type: "optionsAdd" });
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth",
                        });
                    }}
                    type="button"
                    disabled={formPending}
                    aria-label="Add another poll option"
                >
                    <IoAddSharp aria-hidden="true" className="size-7 transition-transform group-hover:scale-90" />
                </button>
            )}
            <BlockButton className="grow" type="submit" disabled={formPending} testId="submit">
                Create
            </BlockButton>
        </div>
    );

    return (
        <form
            action={formAction}
            className="relative mx-auto mb-24 mt-12 inline-flex w-full flex-col sm:w-auto"
            onSubmit={e => {
                if (
                    !validateTitle(state.title) ||
                    !validateClosingTime(new Date(state.closingTime)) ||
                    !validateOptions(state.options)
                ) {
                    e.preventDefault();
                    setModalMessage("Please only provide valid values.");
                }
            }}
        >
            {pollTypeSelect}
            {pollName}
            {datePicker}
            {needsMajorityCheckbox}
            {options}
            {formButtons}
            <Modal closeButtonText="Got it" setChildren={setModalMessage}>
                {modalMessage}
            </Modal>
        </form>
    );
}
