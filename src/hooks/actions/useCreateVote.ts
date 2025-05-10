import { createVote } from "@/actions/vote";
import useActionState from "@/hooks/useActionState";

export default function useCreateVote(pollId: string, selection: number[]) {
    return useActionState(createVote.bind(null, pollId, selection), {
        data: "",
        error: null,
    });
}
