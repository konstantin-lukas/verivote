import { deletePoll } from "@/actions/poll";
import useActionState from "@/hooks/useActionState";

export default function useDeletePoll(id: string) {
    return useActionState(deletePoll.bind(null, id), {
        data: "",
        error: null,
    });
}
