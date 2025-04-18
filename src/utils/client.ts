import type { ActionStateResult, Result } from "@/types/result";

export function resultToActionResult(
    { data, error }: Result<string, string[]>,
    action: () => void,
    pending: boolean,
): ActionStateResult {
    if (data || !error)
        return {
            successMessage: data,
            errorMessages: null,
            action,
            pending,
        };
    return {
        successMessage: null,
        errorMessages: error,
        action,
        pending,
    };
}
