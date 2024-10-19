"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import BlockButton from "@/components/shared/BlockButton";
import Modal from "@/components/shared/Modal";
import { useModal } from "@/hooks";

export default function DeleteAccount() {
    const [modal, setModal] = useModal();
    return (
        <>
            {modal}
            <BlockButton onClick={() => {
                setModal(
                    <Modal closeButtonText="Yes, I'm sure" cancelButtonText="No, go back" onAccept={() => {
                        fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/account", {
                            method: "DELETE",
                            credentials: "include",
                        })
                            .then(() => signOut())
                            .catch(() => setModal(<Modal closeButtonText="Got it">A network error occurred. Please try again.</Modal>));
                    }}>
                        Are you sure you want to delete your account?
                        This will permanently delete all polls you created.
                        This action cannot be undone.
                    </Modal>,
                );
            }}>
                <FaRegTrashAlt className="mr-2 inline translate-y-[-0.1em] text-rose-500"/>
                <span className="text-rose-500">Delete my account</span>
            </BlockButton>
        </>
    );
}