"use client";

import { signOut } from "next-auth/react";
import type { ReactNode } from "react";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import BlockButton from "@/components/shared/BlockButton";
import Modal from "@/components/shared/Modal";

export default function DeleteAccountForm() {
    const [modalMessage, setModalMessage] = useState<ReactNode>(null);

    const modal = (
        <Modal
            closeButtonText="Yes I'm sure"
            cancelButtonText="No, take me back"
            setChildren={setModalMessage}
            onClose={signOut}
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
