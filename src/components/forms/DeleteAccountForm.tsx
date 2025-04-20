"use client";

import type { ReactNode } from "react";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import Modal from "@/components/alert/Modal";
import BlockButton from "@/components/interaction/BlockButton";

export default function DeleteAccountForm() {
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);

    const modal = (
        <Modal
            closeButtonText="Yes I'm sure"
            cancelButtonText="No, take me back"
            setChildren={setModalMessage}
            onClose={() => undefined}
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
        </>
    );
}
