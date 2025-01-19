import { Modal as MUIModal } from "@mui/material";
import type { ReactNode } from "react";
import React from "react";

import BlockButton from "@/components/shared/BlockButton";

export default function Modal({
    children,
    setChildren,
    closeButtonText,
    cancelButtonText,
    onCancel,
    onClose,
}: {
    children?: ReactNode;
    setChildren: (m: ReactNode) => void;
    closeButtonText?: string;
    cancelButtonText?: string;
    onCancel?: () => void;
    onClose?: () => void;
}) {
    const close = () => setChildren(null);
    return (
        <MUIModal open={!!children} onClose={close} className="flex items-center justify-center">
            <aside
                className="flex max-w-[85dvw] flex-col items-center justify-center rounded-2xl border-none bg-neutral-100
                p-8 shadow-vague sm:max-w-[30rem] dark:bg-neutral-900 dark:shadow-dark-vague"
            >
                <p className="mb-6 text-center">{children}</p>
                <div className="flex gap-8">
                    {closeButtonText && (
                        <BlockButton
                            type="button"
                            testId="acceptBtn"
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
                            testId="cancelBtn"
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
