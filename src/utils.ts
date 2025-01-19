import { format } from "date-fns";

export function formatDate(date: Date) {
    return format(date, "dd LLLL yyyy hh:mm aa (OOOO)");
}
