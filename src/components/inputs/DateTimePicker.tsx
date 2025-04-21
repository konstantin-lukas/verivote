import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { format, isValid } from "date-fns";
import type { CSSProperties } from "react";
import { useState } from "react";

import Input from "@/components/inputs/Input";
import { SHORT_DATE_FORMAT } from "@/const/date";

export default function DateTimePicker({
    value,
    onChange,
    minDateTime,
    disabled,
    style,
    valid,
    "data-test-id": testId,
}: {
    "value"?: Date;
    "onChange"?: (value: Date | null) => void;
    "minDateTime"?: Date;
    "disabled"?: boolean;
    "style"?: CSSProperties;
    "valid"?: boolean;
    "data-test-id"?: string;
}) {
    const [pickerOpen, setPickerOpen] = useState(false);
    const date = value && isValid(value) ? format(value, SHORT_DATE_FORMAT) : "";
    return (
        <>
            <Input
                placeholder="Select date & time"
                value={date}
                onClick={() => setPickerOpen(true)}
                onKeyDown={e => e.key === "Enter" && setPickerOpen(true)}
                readOnly
                valid={valid}
                disabled={disabled}
                style={{ cursor: "pointer", ...style }}
                data-test-id={testId}
            />
            <MobileDateTimePicker
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                value={value}
                ampmInClock
                minDateTime={minDateTime}
                onChange={onChange}
                disabled={disabled}
                slotProps={{
                    textField: { style: { display: "none" } },
                }}
            />
        </>
    );
}
