import { useActionState, useEffect } from "react";

import { createPoll } from "@/actions/poll";
import useLoadingState from "@/hooks/useLoadingState";
import type { Poll } from "@/types/poll";
import { resultToActionResult } from "@/utils/client";

export default function useCreationFormActionState(state: Poll) {
    const [payload, action, pending] = useActionState(createPoll.bind(null, state), {
        data: "",
        error: null,
    });
    const { setIsLoading } = useLoadingState();
    useEffect(() => {
        setIsLoading(pending);
    }, [pending, setIsLoading]);

    return resultToActionResult(payload, action, pending);
}
