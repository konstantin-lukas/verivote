import type { ReactElement } from "react";
import { cloneElement, useState } from "react";


/**
 * This hook encapsulates the modal component so that it automatically removes itself from the dom after closing
 */
export function useModal(): [ReactElement | null, (m: ReactElement | null) => void] {
    const [modal, setModal] = useState<ReactElement | null>(null);
    return [modal, (newModal: ReactElement | null) => {
        if (!newModal) {
            setModal(null);
            return;
        }
        const onClose = () => setModal(null);
        const clonedElement = cloneElement(newModal, { onClose });
        setModal(clonedElement);
    }];
}