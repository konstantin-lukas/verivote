import React from "react";

export default function Input({ value, setValue, placeholder, className, disabled, required, name, maxLength }: {
    value: string,
    setValue: (value: string) => void,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    required?: boolean,
    name?: string,
    maxLength?: number,
}) {
    return (
        <input
            type="text"
            value={value}
            name={name}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            className={`rounded-full bg-neutral-100 px-10 py-2 shadow-3d-inset placeholder:text-neutral-500
                dark:bg-neutral-900 dark:shadow-dark-3d-inset ${className ?? ""}`}
        />
    );
}