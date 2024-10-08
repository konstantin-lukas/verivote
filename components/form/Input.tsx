import React from "react";

export default function Input({ value, setValue, placeholder, className }: {
    value: string,
    setValue: (value: string) => void,
    placeholder?: string,
    className?: string
}) {
    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            className={`rounded-full bg-neutral-100 px-10 py-2 shadow-3d-inset
                dark:bg-neutral-900 dark:shadow-dark-3d-inset ${className ?? ""}`}
        />
    );
}