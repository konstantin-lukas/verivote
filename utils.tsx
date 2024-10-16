import type { FormEvent, ReactElement } from "react";
import React from "react";

import Modal from "@/components/shared/Modal";

export function submitVote(
    e: FormEvent<HTMLFormElement>,
    setModal: (v: ReactElement | null) => void,
    setDisabled: (v: boolean) => void,
    setHasVoted: (v: boolean) => void,
    payload: { pollId: string, selection: number[] },
) {
    e.preventDefault();
    e.stopPropagation();
    const error = () => {
        setModal(
            <Modal closeButtonText="Got it">
                An error occurred while sending your request. Please try again later.
            </Modal>,
        );

        setDisabled(false);
    };
    setDisabled(true);
    fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/vote", {
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => {
        if (!res.ok) {
            error();
            return;
        }
        setDisabled(false);
        setHasVoted(true);
    }).catch(() => {
        error();
    });
}