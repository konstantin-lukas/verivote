import { useContext } from "react";

import { LoadingStateContext } from "@/contexts";

export default function useLoadingState() {
    return useContext(LoadingStateContext);
}
