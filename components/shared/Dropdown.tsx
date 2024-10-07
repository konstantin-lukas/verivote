"use client";

import { useClickOutside } from "anzol";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiExpandVertical } from "react-icons/bi";


/**
 * @brief A fully custom dropdown menu that allows selecting a single value from a list of values
 * @param options - An array of strings to display as selectable options
 * @param defaultOption - Index of the option in the options array to be selected by default
 * @param getValue - A setState function from the parent component
 * @param ariaLabel - The aria-label to use
 * The dropdown uses this function to return the currently selected index on change
 */
function Dropdown({ options, defaultOption, getValue, ariaLabel }: {
    options: string[],
    defaultOption: number,
    getValue: (val: number) => void,
    ariaLabel: string
}) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [isOpen, setIsOpen] = useState(false);
    const elements = useMemo(() => {
        return options.map((str, index) => {
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
                    className="mt-4 cursor-pointer rounded-full px-10 py-2 shadow-3d-inset first:mt-0 dark:shadow-dark-3d-inset"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") setSelected();
                    }}
                >
                    <div data-nosnippet="true">
                        {str}
                    </div>
                </div>
            );
        }).filter((jsx) => {
            return parseInt(jsx.key as string) !== selectedOption;
        });
    }, [options, getValue, selectedOption]);

    const ref = useClickOutside(() => setIsOpen(false));

    return (
        <div ref={ref} role="listbox" aria-label={ariaLabel} className="inline-block">
            <div
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") setIsOpen(!isOpen);
                }}
                role="option"
                className={
                    "mb-6 min-w-64 flex cursor-pointer items-center justify-between rounded-full px-10 py-2 transition-all "
                    + (isOpen ? "shadow-3d-both dark:shadow-dark-3d-both" : "shadow-3d dark:shadow-dark-3d")
                }
                aria-selected="true"
                tabIndex={0}
            >
                <div data-nosnippet="true">
                    {options[selectedOption]}
                </div>
                <BiExpandVertical className="ml-2"/>
            </div>
            {isOpen && (
                <div className={"rounded-3xl p-4 shadow-3d dark:shadow-dark-3d"}>
                    {elements}
                </div>)
            }
        </div>
    );
}

export default Dropdown;
