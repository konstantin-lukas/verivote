import { Modal as MUIModal } from "@mui/material";
import type { ReactNode } from "react";
import React from "react";

import BlockButton from "@/components/interaction/BlockButton";

export default function Modal({
    children,
    setChildren,
    closeButtonText,
    cancelButtonText,
    onCancel,
    onClose,
    highlightCloseButton,
}: {
    children?: ReactNode;
    setChildren: (m: ReactNode) => void;
    closeButtonText?: string;
    cancelButtonText?: string;
    onCancel?: () => void;
    onClose?: () => void;
    highlightCloseButton?: boolean;
}) {
    const close = () => setChildren(null);
    return (
        <MUIModal open={!!children} onClose={close} className="flex items-center justify-center">
            <aside className="shadow-vague dark:shadow-dark-vague flex max-w-[85dvw] flex-col items-center justify-center rounded-2xl border-none bg-neutral-100 p-8 sm:max-w-[30rem] dark:bg-neutral-900">
                <div className="mb-6 text-center">{children}</div>
                <div className="flex gap-8">
                    {closeButtonText && (
                        <BlockButton
                            type="button"
                            data-test-id="acceptBtn"
                            className={highlightCloseButton ? "text-rose-500" : ""}
                            onClick={() => {
                                if (onClose) onClose();
                                close();
                            }}
                        >
                            {closeButtonText}
                        </BlockButton>
                    )}
                    {cancelButtonText && (
                        <BlockButton
                            type="button"
                            data-test-id="cancelBtn"
                            onClick={() => {
                                if (onCancel) onCancel();
                                close();
                            }}
                        >
                            {cancelButtonText}
                        </BlockButton>
                    )}
                </div>
            </aside>
        </MUIModal>
    );
}
