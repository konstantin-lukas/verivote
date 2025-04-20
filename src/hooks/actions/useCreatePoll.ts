import { createPoll } from "@/actions/poll";
import useActionState from "@/hooks/useActionState";
import type { PollFormState } from "@/types/poll";

export default function useCreatePoll(state: PollFormState) {
    return useActionState(createPoll.bind(null, state), {
        data: "",
        error: null,
    });
}
