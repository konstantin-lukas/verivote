"use client";

import { addDays, addMinutes, setSeconds } from "date-fns";
import type { ReactNode } from "react";
import React, { useActionState, useEffect, useMemo, useReducer, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";

import { createPoll } from "@/actions/poll";
import Checkbox from "@/components/inputs/Checkbox";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import Dropdown from "@/components/inputs/Dropdown";
import Input from "@/components/inputs/Input";
import BlockButton from "@/components/shared/BlockButton";
import ErrorList from "@/components/shared/ErrorList";
import Modal from "@/components/shared/Modal";
import { VOTING_METHODS } from "@/const/misc";
import { MAX_POLL_OPTION_TITLE_LENGTH, MAX_POLL_TITLE_LENGTH } from "@/const/poll";
import useLoadingState from "@/hooks/useLoadingState";
import { PollClosingTimeSchema, PollCreateClientSchema, PollOptionSchema, PollTitleSchema } from "@/schemas/poll";
import type { Poll } from "@/types/poll";
import { parseSchema } from "@/utils/shared";

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
        votingMethod: defaultMethod ?? VOTING_METHODS[0].dbId,
        title: "",
        closingTime: new Date(""),
        winnerNeedsMajority: false,
        options: ["", ""],
    });
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);

    const [{ successMessage, errorMessages }, formAction, formPending] = useActionState(createPoll.bind(null, state), {
        successMessage: "",
        errorMessages: null,
    });
    const { setIsLoading } = useLoadingState();
    useEffect(() => {
        setIsLoading(formPending);
    }, [formPending, setIsLoading]);

    /**
     * This effect and state is used instead of an initial value for the date to prevent a very rate hydration error.
     * The hours and minutes of the date are displayed by the material ui datetime picker.
     * If a client makes a request at the end of a minute and the response arrives in the next minute, the displayed
     * HTML will differ. Setting an empty string as a date prevents that because the initial value is static.
     */
    const [minDateTime, setMinDateTime] = useState<Date | undefined>();
    useEffect(() => {
        dispatch({
            type: "date",
            value: setSeconds(addDays(new Date(), 1), 0),
        });
        setMinDateTime(addMinutes(new Date(), 1));
    }, []);

    useEffect(() => {
        if (!formPending) {
            if (successMessage !== null) {
                setModalMessage(successMessage);
                return;
            }
            setModalMessage(<ErrorList errors={errorMessages} isServerSideError={true} />);
        }
    }, [successMessage, errorMessages, formPending]);

    const options = useMemo(() => {
        return state.options.map((o, i) => (
            <div key={i} className="relative mt-4">
                <Input
                    value={o}
                    disabled={formPending}
                    className="w-full"
                    name="options"
                    maxLength={MAX_POLL_OPTION_TITLE_LENGTH}
                    valid={!parseSchema(PollOptionSchema, o)}
                    required={true}
                    onChange={value => dispatch({ type: "optionsChange", value, index: i })}
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
        ));
    }, [state, formPending]);

    const pollTypeSelect = (
        <Dropdown
            options={VOTING_METHODS.map(m => m.name)}
            defaultOption={VOTING_METHODS.findIndex(v => v.dbId === (defaultMethod ?? VOTING_METHODS[0].dbId))}
            disabled={formPending}
            getValue={(index: number) =>
                dispatch({
                    type: "method",
                    value: VOTING_METHODS[index].dbId,
                })
            }
            ariaLabel="Select poll type"
        />
    );

    const pollName = (
        <Input
            value={state.title}
            name="title"
            required={true}
            valid={!parseSchema(PollTitleSchema, state.title)}
            maxLength={MAX_POLL_TITLE_LENGTH}
            disabled={formPending}
            onChange={value => dispatch({ type: "title", value })}
            placeholder="Poll title"
        />
    );

    const datePicker = (
        <DateTimePicker
            value={state.closingTime}
            minDateTime={minDateTime}
            valid={!parseSchema(PollClosingTimeSchema, state.closingTime)}
            onChange={date => {
                dispatch({ type: "date", value: date ?? new Date() });
                setMinDateTime(addMinutes(new Date(), 1));
            }}
            disabled={formPending}
            style={{ marginTop: "1rem" }}
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
                    className="shadow-3d hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both group flex size-10 items-center justify-center rounded-full transition-shadow"
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
                const errors = parseSchema(PollCreateClientSchema, state);
                if (errors) {
                    e.preventDefault();
                    setModalMessage(<ErrorList errors={errors} />);
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
