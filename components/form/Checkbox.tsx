import type { ChangeEventHandler } from "react";
import React from "react";

export default function Checkbox({ onChange, checked, label, disabled }: {
    onChange: ChangeEventHandler<HTMLInputElement>
    checked: boolean,
    label: string,
    disabled?: boolean,
}) {
    return (
        <label
            className="mt-4 flex items-center justify-between"
            style={{ cursor: disabled ? "not-allowed" : "pointer" }}
        >
            <span className="mr-4">{label}</span>
            <input type="checkbox" disabled={disabled} onChange={onChange} checked={checked} className="peer hidden"/>
            <span
                className="relative h-10 w-28 overflow-hidden rounded-full border-2 border-rose-500 bg-rose-500
                transition-colors peer-checked:border-verivote-turquoise peer-checked:bg-verivote-turquoise
                peer-checked:[&_span]:animate-[ltr-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards]
                peer-checked:[&_span]:border-verivote-turquoise"
                style={{
                    backgroundColor: disabled ? "gray" : undefined,
                    borderColor: disabled ? "gray" : undefined,
                }}
            >
                <span
                    className="absolute left-2 flex h-full w-1/2 animate-[rtl-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards]
                    rounded-full border-4 border-rose-500 bg-neutral-100 transition-colors dark:bg-neutral-900"
                    style={{
                        borderColor: disabled ? "gray" : undefined,
                    }}
                >
                </span>
            </span>
        </label>
    );
}