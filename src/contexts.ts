import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export const LoadingStateContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([
    false,
    () => undefined,
]);
