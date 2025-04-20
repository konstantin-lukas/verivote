import { createVote } from "@/actions/vote";
import useActionState from "@/hooks/useActionState";

export default function useCreateVote() {
    return useActionState(createVote, {
        data: "",
        error: null,
    });
}
