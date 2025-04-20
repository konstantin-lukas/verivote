import { useActionState as useReactActionState, useEffect } from "react";

import useLoadingState from "@/hooks/useLoadingState";
import type { ActionResult, ActionStateResult, Failure, Success } from "@/types/result";

export default function useActionState<T>(
    action: () => ActionResult<T>,
    initialData: Success<T> | Failure<string[]>,
): ActionStateResult<T> {
    const [payload, dispatch, pending] = useReactActionState(action, initialData);
    const { setIsLoading } = useLoadingState();
    useEffect(() => {
        setIsLoading(pending);
    }, [pending, setIsLoading]);

    return { ...payload, action: dispatch, pending };
}
