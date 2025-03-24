import React from "react";

export default function Input({
    value,
    setValue,
    placeholder,
    className,
    disabled,
    required,
    name,
    maxLength,
    testId,
    valid,
}: {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    maxLength?: number;
    testId?: string;
    valid?: boolean;
}) {
    return (
        <input
            type="text"
            value={value}
            name={name}
            data-cy={testId}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            onInput={e => setValue((e.target as HTMLInputElement).value)}
            className={`rounded-full bg-neutral-100 px-10 py-2 inset-shadow-3d transition-all
                placeholder:text-neutral-500 dark:bg-neutral-900 dark:inset-shadow-dark-3d ${className ?? ""} 
                ${typeof valid !== "undefined" && !valid && "outline-rose-500"}`}
        />
    );
}
