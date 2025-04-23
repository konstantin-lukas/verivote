"use client";

import { addDays, addMinutes, setSeconds } from "date-fns";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";

import ErrorList from "@/components/alert/ErrorList";
import Modal from "@/components/alert/Modal";
import Checkbox from "@/components/inputs/Checkbox";
import DateTimePicker from "@/components/inputs/DateTimePicker";
import Dropdown from "@/components/inputs/Dropdown";
import Input from "@/components/inputs/Input";
import BlockButton from "@/components/interaction/BlockButton";
import { VOTING_METHODS } from "@/const/misc";
import { MAX_POLL_OPTION_TITLE_LENGTH, MAX_POLL_OPTIONS, MAX_POLL_TITLE_LENGTH } from "@/const/poll";
import useCreatePoll from "@/hooks/actions/useCreatePoll";
import useCreationFormReducer from "@/hooks/reducers/useCreationFormReducer";
import { PollClosingTimeSchema, PollCreateClientSchema, PollOptionSchema, PollTitleSchema } from "@/schemas/poll";
import { parseSchema } from "@/utils/shared";

export default function CreatePollForm({ defaultMethod }: { defaultMethod?: number }) {
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);
    const [minDateTime, setMinDateTime] = useState<Date | undefined>();

    const [state, dispatch] = useCreationFormReducer(defaultMethod);
    const { data: successMessage, error: errorMessages, action, pending } = useCreatePoll(state);

    useEffect(() => {
        dispatch({
            type: "date",
            value: setSeconds(addDays(new Date(), 1), 0),
        });
        setMinDateTime(addMinutes(new Date(), 1));
    }, [dispatch]);

    useEffect(() => {
        if (!pending) {
            if (successMessage !== null) {
                setModalMessage(successMessage);
                return;
            }
            setModalMessage(<ErrorList errors={errorMessages} isServerSideError={true} />);
        }
    }, [successMessage, errorMessages, pending]);

    const options = state.options.map((option, i) => (
        <div key={i} className="relative mt-4">
            <Input
                value={option}
                disabled={pending}
                className="w-full"
                name="options"
                maxLength={MAX_POLL_OPTION_TITLE_LENGTH}
                valid={!parseSchema(PollOptionSchema, option)}
                required={true}
                onChange={value => dispatch({ type: "optionsChange", value, index: i })}
                placeholder={`Option ${i + 1}`}
                data-test-id={`poll-option-${i + 1}`}
            />
            {i >= 2 && (
                <button
                    className="group absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => dispatch({ type: "optionsDelete", index: i })}
                    disabled={pending}
                    type="button"
                    aria-label={`Delete poll option ${i + 1}: ${option}`}
                    data-test-id={`delete-poll-option-${i + 1}`}
                >
                    <IoMdClose className="size-6 transition-colors group-hover:text-rose-500" />
                </button>
            )}
        </div>
    ));

    const pollTypeSelect = (
        <Dropdown
            options={VOTING_METHODS.map(m => m.name)}
            defaultOption={VOTING_METHODS.findIndex(v => v.dbId === (defaultMethod ?? VOTING_METHODS[0].dbId))}
            disabled={pending}
            getValue={(index: number) =>
                dispatch({
                    type: "method",
                    value: VOTING_METHODS[index].dbId,
                })
            }
            data-test-id="poll-type-select"
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
            disabled={pending}
            onChange={value => dispatch({ type: "title", value })}
            placeholder="Poll title"
            data-test-id="poll-name-input"
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
            disabled={pending}
            style={{ marginTop: "1rem" }}
            data-test-id="poll-date-input"
        />
    );

    const needsMajorityCheckbox = (
        <Checkbox
            onChange={e => dispatch({ type: "majority", value: e.target.checked })}
            checked={state.winnerNeedsMajority}
            label={`Winner needs majority: ${state.winnerNeedsMajority ? "yes" : "no"}`}
            disabled={pending}
            name="majority"
            data-test-id="majority-checkbox"
        />
    );

    const formButtons = (
        <div className="mt-6 flex gap-6">
            {state.options.length < MAX_POLL_OPTIONS && (
                <button
                    className="shadow-3d hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both group flex size-10 items-center justify-center rounded-full transition-shadow"
                    onClick={() => {
                        if (state.options.length < MAX_POLL_OPTIONS) {
                            dispatch({ type: "optionsAdd" });
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth",
                            });
                        }
                    }}
                    type="button"
                    disabled={pending}
                    aria-label="Add another poll option"
                    data-test-id="add-poll-option-button"
                >
                    <IoAddSharp aria-hidden="true" className="size-7 transition-transform group-hover:scale-90" />
                </button>
            )}
            <BlockButton className="grow" type="submit" disabled={pending} data-test-id="submit-create-poll-button">
                Create
            </BlockButton>
        </div>
    );

    return (
        <form
            action={action}
            className="relative mx-auto mb-24 mt-12 inline-flex w-full flex-col sm:w-80"
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
