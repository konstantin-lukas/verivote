"use client";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider as Provider } from "@mui/x-date-pickers/LocalizationProvider";
import type { ReactNode } from "react";

export default function LocalizationProvider({ children }: { children: ReactNode }) {
    return <Provider dateAdapter={AdapterDateFns}>{children}</Provider>;
}
