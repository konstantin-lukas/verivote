import type { CSSProperties, KeyboardEventHandler, MouseEventHandler, RefObject } from "react";

export default function Input({
    value,
    onChange,
    onKeyDown,
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
    "data-test-id": testId,
}: {
    "value"?: string;
    "onChange"?: (value: string) => void;
    "onKeyDown"?: KeyboardEventHandler;
    "placeholder"?: string;
    "className"?: string;
    "disabled"?: boolean;
    "required"?: boolean;
    "name"?: string;
    "maxLength"?: number;
    "valid"?: boolean;
    "ref"?: RefObject<HTMLInputElement | null>;
    "onClick"?: MouseEventHandler;
    "readOnly"?: boolean;
    "style"?: CSSProperties;
    "data-test-id"?: string;
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
            onKeyDown={onKeyDown}
            onChange={onChange && (e => onChange((e.target as HTMLInputElement).value))}
            data-test-id={testId}
            className={`inset-shadow-3d dark:inset-shadow-dark-3d rounded-full bg-neutral-100 px-10 py-2 transition-all placeholder:text-neutral-500 dark:bg-neutral-900 ${className ?? ""} ${typeof valid !== "undefined" && !valid && "outline-rose-500"}`}
        />
    );
}
