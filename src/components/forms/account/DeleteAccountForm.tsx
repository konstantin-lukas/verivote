"use client";

import { Snackbar } from "@mui/material";
import type { ReactNode } from "react";
import React, { startTransition, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "@/components/alert/Modal";
import BlockButton from "@/components/interaction/BlockButton";
import useDeleteAccount from "@/hooks/actions/useDeleteAccount";

export default function DeleteAccountForm() {
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);
    const { action, error } = useDeleteAccount();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(!!error);
    }, [error]);

    const modal = (
        <Modal
            closeButtonText="Yes I'm sure"
            cancelButtonText="No, take me back"
            setChildren={setModalMessage}
            onClose={() => startTransition(action)}
            onCancel={() => setModalMessage(null)}
        >
            {modalMessage}
        </Modal>
    );

    return (
        <>
            <BlockButton
                onClick={() => {
                    setModalMessage(
                        "Are you sure you want to delete your account? This will permanently delete all polls you " +
                            "created. This action cannot be undone.",
                    );
                }}
            >
                <FaRegTrashAlt className="mr-2 inline translate-y-[-0.1em] text-rose-500" />
                <span className="text-rose-500">Delete my account</span>
            </BlockButton>
            {modal}
            <Snackbar
                open={isOpen}
                autoHideDuration={5000}
                message={`Error: ${error?.join(" | ")}`}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
