import { useClickOutside } from "anzol";
import { useEffect, useState } from "react";
import { BiExpandVertical } from "react-icons/bi";

export default function Dropdown({
    options,
    defaultOption,
    getValue,
    ariaLabel,
    disabled,
    "data-test-id": testId,
}: {
    "options": string[];
    "defaultOption": number;
    "getValue": (val: number) => void;
    "ariaLabel": string;
    "disabled"?: boolean;
    "data-test-id"?: string;
}) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useClickOutside(() => setIsOpen(false));

    useEffect(() => {
        if (disabled) setIsOpen(false);
    }, [disabled]);

    const elements = options
        .map((str, index) => {
            const setSelected = () => {
                setIsOpen(false);
                setSelectedOption(index);
                getValue(index);
            };
            return (
                <div
                    onClick={setSelected}
                    key={index}
                    role="option"
                    aria-selected="false"
                    className="inset-shadow-3d dark:inset-shadow-dark-3d mt-4 cursor-pointer rounded-full px-10 py-2 first:mt-0"
                    tabIndex={0}
                    onKeyDown={e => {
                        if (e.key === " " || e.key === "Enter") setSelected();
                    }}
                    data-test-id={`${testId}-option-${index + 1}`}
                >
                    <div data-nosnippet="true">{str}</div>
                </div>
            );
        })
        .filter(jsx => {
            return parseInt(jsx.key as string) !== selectedOption;
        });

    const shadowStyle = isOpen ? "shadow-3d-both dark:shadow-dark-3d-both" : "shadow-3d dark:shadow-dark-3d";
    const cursorStyle = disabled ? "cursor-wait" : "cursor-pointer";
    return (
        <div ref={ref} role="listbox" aria-label={ariaLabel} className="relative inline-block">
            <div
                onClick={() => {
                    if (!disabled) setIsOpen(!isOpen);
                }}
                onKeyDown={e => {
                    if (e.key === " " || e.key === "Enter") setIsOpen(!isOpen);
                }}
                role="option"
                className={`mb-6 rounded-full px-10 py-2 transition-all sm:min-w-60 ${shadowStyle} ${cursorStyle}`}
                aria-selected="true"
                data-test-id={testId}
                tabIndex={0}
            >
                <div className={`flex items-center justify-between transition-transform ${isOpen ? "scale-95" : ""}`}>
                    <div
                        data-nosnippet="true"
                        className={disabled ? "text-[gray]" : ""}
                        data-test-id={`${testId}-selected-text`}
                    >
                        {options[selectedOption]}
                    </div>
                    <BiExpandVertical className={`ml-2${disabled ? "text-[gray]" : ""}`} />
                </div>
            </div>
            {isOpen && (
                <div className="shadow-3d dark:shadow-dark-3d absolute z-20 w-full rounded-3xl bg-neutral-100 p-4 dark:bg-neutral-900">
                    {elements}
                </div>
            )}
        </div>
    );
}
