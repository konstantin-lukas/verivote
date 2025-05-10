import { signOut } from "next-auth/react";
import { useEffect } from "react";

import { deleteAccount } from "@/actions/account";
import useActionState from "@/hooks/useActionState";

export default function useDeleteAccount() {
    const state = useActionState(deleteAccount, {
        data: false,
        error: null,
    });
    useEffect(() => {
        if (state.data && !state.pending) signOut().then(() => undefined);
    }, [state.pending, state.data]);
    return state;
}
