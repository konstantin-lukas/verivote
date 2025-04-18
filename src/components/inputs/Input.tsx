import type { CSSProperties, MouseEventHandler, RefObject } from "react";
import React from "react";

export default function Input({
    value,
    onChange,
    placeholder,
    className,
    disabled,
    required,
    name,
    maxLength,
    valid,
    ref,
    onClick,
    readOnly,
    style,
}: {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    maxLength?: number;
    valid?: boolean;
    ref?: RefObject<HTMLInputElement | null>;
    onClick?: MouseEventHandler;
    readOnly?: boolean;
    style?: CSSProperties;
}) {
    return (
        <input
            type="text"
            ref={ref}
            value={value}
            onClick={onClick}
            name={name}
            readOnly={readOnly}
            maxLength={maxLength}
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            style={style}
            onChange={onChange && (e => onChange((e.target as HTMLInputElement).value))}
            className={`inset-shadow-3d dark:inset-shadow-dark-3d rounded-full bg-neutral-100 px-10 py-2 transition-all placeholder:text-neutral-500 dark:bg-neutral-900 ${className ?? ""} ${typeof valid !== "undefined" && !valid && "outline-rose-500"}`}
        />
    );
}
