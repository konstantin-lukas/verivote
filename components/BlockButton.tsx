import type { KeyboardEventHandler, MouseEventHandler } from "react";
import React from "react";

export default function ButtonLink({ children, onPress }: {
    children: React.ReactNode,
    onPress: MouseEventHandler<HTMLButtonElement> | KeyboardEventHandler<HTMLButtonElement>
}) {
    return (
        <button
            onClick={onPress as MouseEventHandler}
            onKeyDown={onPress as KeyboardEventHandler}
            className="group inline-block rounded-full bg-neutral-100 px-5 py-3 font-medium shadow-3d transition-shadow
            hover:shadow-3d-inset dark:bg-neutral-900 dark:shadow-dark-3d dark:hover:shadow-dark-3d-inset"
        >
            <span className="m-0 block font-medium transition-transform group-hover:scale-95">
                {children}
            </span>
        </button>
    );
}