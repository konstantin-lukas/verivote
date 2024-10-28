"use client";

import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import BlockButton from "@/components/shared/BlockButton";
import Modal from "@/components/shared/Modal";
import { useModal } from "@/hooks";

export default function DeleteButton({ id, testId }: { id: string, testId?: string }) {
    const [modal, setModal] = useModal();
    return (
        <>
            {modal}
            <BlockButton className="mt-6 flex grow justify-center" testId={testId} onClick={() => {
                setModal(
                    <Modal
                        closeButtonText="Yes, I'm sure"
                        cancelButtonText="No, take me back"
                        onAccept={() => {
                            fetch(process.env.NEXT_PUBLIC_API_ORIGIN + "/poll/" + id, {
                                method: "DELETE",
                                credentials: "include",
                            }).then(() => {
                                window.location.reload();
                            }).catch(() => setModal(<Modal closeButtonText="Got it">A network error ocurred.</Modal>));
                        }}
                    >
                        Are you sure you want to delete this poll?
                    </Modal>,
                );
            }}>
                <FaRegTrashAlt className="mr-1 inline translate-y-[-0.1em]"/>
                <span>Delete</span>
            </BlockButton>
        </>
    );
}