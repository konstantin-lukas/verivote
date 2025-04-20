import { Snackbar as MUISnackbar } from "@mui/material";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function Snackbar({ message, toggle }: { message?: ReactNode; toggle?: boolean }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(!!message);
    }, [message, toggle]);
    return <MUISnackbar open={open} message={message} autoHideDuration={5000} onClose={() => setOpen(false)} />;
}
