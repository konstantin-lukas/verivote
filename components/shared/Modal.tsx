"use client";

import type { ReactEventHandler } from "react";
import React, { useEffect, useRef } from "react";

import BlockButton from "@/components/shared/BlockButton";

export default function Modal({ children, closeButtonText, cancelButtonText, onClose, onAccept }: {
    children: React.ReactNode,
    closeButtonText: string,
    cancelButtonText?: string,
    onClose?: ReactEventHandler<HTMLDialogElement>,
    onAccept?: () => void,
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        dialog.current?.showModal();
    }, [dialog]);
    return (
        <dialog
            ref={dialog}
            onClose={onClose}
            aria-modal
            className="flex max-w-[85dvw] flex-col items-center justify-center rounded-2xl border-none
            bg-neutral-100 p-8 shadow-vague sm:max-w-[30rem] dark:bg-neutral-900 dark:shadow-dark-vague"
        >
            <p className="mb-6 text-center">
                {children}
            </p>
            <div className="flex gap-8">
                <BlockButton type="button" testId="acceptBtn" onClick={() => {
                    if (!dialog.current) return;
                    dialog.current.style.display = "none";
                    dialog.current.close();
                    if (typeof onAccept === "function") onAccept();
                }}>
                    {closeButtonText}
                </BlockButton>
                {cancelButtonText && (
                    <BlockButton type="button" testId="cancelBtn" onClick={() => {
                        if (!dialog.current) return;
                        dialog.current.style.display = "none";
                        dialog.current.close();
                    }}>
                        {cancelButtonText}
                    </BlockButton>
                )}
            </div>
        </dialog>
    );
}