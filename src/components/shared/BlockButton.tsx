import type { KeyboardEventHandler, MouseEventHandler } from "react";
import React from "react";

export default function ButtonLink({
    children,
    onClick,
    className,
    tabIndex,
    type,
    disabled,
    testId,
}: {
    children: React.ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement> | KeyboardEventHandler<HTMLButtonElement>;
    className?: string;
    tabIndex?: number;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    testId?: string;
}) {
    return (
        <button
            onClick={onClick as MouseEventHandler}
            tabIndex={tabIndex}
            type={type}
            data-cy={testId}
            disabled={disabled}
            className={`shadow-3d hover:shadow-3d-both dark:shadow-dark-3d dark:hover:shadow-dark-3d-both group inline-block cursor-pointer rounded-full bg-neutral-100 px-10 py-2 font-medium transition-all dark:bg-neutral-900 ${className ?? ""}`}
        >
            <span className="m-0 block font-medium transition-transform group-hover:scale-95">{children}</span>
        </button>
    );
}
