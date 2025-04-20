import { createPoll } from "@/actions/poll";
import useActionState from "@/hooks/useActionState";
import type { Poll } from "@/types/poll";

export default function useCreatePoll(state: Poll) {
    return useActionState(createPoll.bind(null, state), {
        data: "",
        error: null,
    });
}
