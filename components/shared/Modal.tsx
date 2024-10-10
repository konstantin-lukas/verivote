"use client";

import type { ReactEventHandler } from "react";
import React, { useEffect, useRef } from "react";

import BlockButton from "@/components/shared/BlockButton";

export default function Modal({ children, closeButtonText, onClose }: {
    children: React.ReactNode,
    closeButtonText: string,
    onClose?: ReactEventHandler<HTMLDialogElement>,
}) {
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        dialog.current?.showModal();
    }, [dialog]);
    return (
        <dialog
            ref={dialog}
            onClose={onClose}
            className="flex max-w-[85dvw] flex-col items-center justify-center rounded-2xl border-none
            bg-neutral-100 p-8 shadow-vague sm:max-w-96 dark:bg-neutral-900 dark:shadow-dark-vague"
        >
            <p className="mb-6 text-center">
                {children}
            </p>
            <div>
                <BlockButton type="button" onClick={() => {
                    if (!dialog.current) return;
                    dialog.current.style.display = "none";
                    dialog.current.close();
                }}>
                    {closeButtonText}
                </BlockButton>
            </div>
        </dialog>
    );
}