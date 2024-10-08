import type { ChangeEventHandler } from "react";
import React from "react";

export default function Checkbox({ onChange, checked, label }: {
    onChange: ChangeEventHandler<HTMLInputElement>
    checked: boolean,
    label: string
}) {
    return (
        <label className="mt-4 flex cursor-pointer items-center justify-between">
            <span>{label}</span>
            <input type="checkbox" onChange={onChange} checked={checked} className="peer hidden"/>
            <span
                className="relative h-10 w-28 overflow-hidden rounded-full border-2 border-rose-500 bg-rose-500
                transition-colors peer-checked:border-verivote-turquoise peer-checked:bg-verivote-turquoise
                peer-checked:[&_span]:animate-[ltr-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards]
                peer-checked:[&_span]:border-verivote-turquoise"
            >
                <span
                    className="absolute left-2 flex h-full w-1/2 animate-[rtl-checkbox_300ms_cubic-bezier(0,.65,0,.99)_forwards]
                    rounded-full border-4 border-rose-500 bg-neutral-100 transition-colors dark:bg-neutral-900"
                >
                </span>
            </span>
        </label>
    );
}