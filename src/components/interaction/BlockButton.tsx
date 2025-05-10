import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";

export default function ButtonLink({
    children,
    onClick,
    className,
    tabIndex,
    type,
    disabled,
    "data-test-id": testId,
}: {
    "children": ReactNode;
    "onClick"?: MouseEventHandler<HTMLButtonElement> | KeyboardEventHandler<HTMLButtonElement>;
    "className"?: string;
    "tabIndex"?: number;
    "type"?: "submit" | "reset" | "button";
    "disabled"?: boolean;
    "data-test-id"?: string;
}) {
    return (
        <button
            onClick={onClick as MouseEventHandler}
            tabIndex={tabIndex}
            type={type}
            data-test-id={testId}
            disabled={disabled}
            className={`shadow-3d enabled:hover:shadow-3d-both dark:shadow-dark-3d dark:enabled:hover:shadow-dark-3d-both group inline-block cursor-pointer rounded-full bg-neutral-100 px-10 py-2 font-medium transition-all disabled:cursor-not-allowed dark:bg-neutral-900 ${className ?? ""}`}
        >
            <span className="m-0 block font-medium transition-transform group-enabled:group-hover:scale-95">
                {children}
            </span>
        </button>
    );
}
