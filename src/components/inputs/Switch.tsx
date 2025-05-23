"use client";

import type { ChangeEventHandler } from "react";
import { useRef } from "react";

export default function Switch({
    onChange,
    checked,
    label,
    disabled,
    name,
    "data-test-id": testId,
}: {
    "onChange": ChangeEventHandler<HTMLInputElement>;
    "checked": boolean;
    "label": string;
    "disabled"?: boolean;
    "name"?: string;
    "data-test-id"?: string;
}) {
    const ref = useRef(null);
    return (
        <label
            className="mt-4 flex items-center justify-between"
            style={{ cursor: disabled ? "wait" : "pointer" }}
            data-test-id={testId}
        >
            <span className="mr-4" data-test-id={`${testId}-label`}>
                {label}
            </span>
            <input
                ref={ref}
                type="checkbox"
                disabled={disabled}
                onChange={onChange}
                checked={checked}
                className="peer hidden"
                name={name}
            />
            <span
                className="peer-checked:border-verivote-turquoise peer-checked:bg-verivote-turquoise peer-checked:[&_span]:border-verivote-turquoise relative h-10 w-28 overflow-hidden rounded-full border-2 border-rose-500 bg-rose-500 transition-colors peer-checked:[&_span]:animate-[ltr-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards]"
                style={{
                    backgroundColor: disabled ? "gray" : undefined,
                    borderColor: disabled ? "gray" : undefined,
                }}
                aria-label={label}
                role="checkbox"
                tabIndex={0}
                aria-checked={checked}
                onKeyDown={e => {
                    if (e.key !== "Enter" || !ref.current) return;
                    (ref.current as HTMLInputElement).checked = !(ref.current as HTMLInputElement).checked;
                }}
            >
                <span
                    className="absolute left-2 flex h-full w-1/2 animate-[rtl-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards] rounded-full border-4 border-rose-500 bg-neutral-100 transition-colors dark:bg-neutral-900"
                    style={{
                        borderColor: disabled ? "gray" : undefined,
                    }}
                />
            </span>
        </label>
    );
}
