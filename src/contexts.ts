import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export const LoadingStateContext = createContext<{
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}>({
    isLoading: false,
    setIsLoading: () => undefined,
});
