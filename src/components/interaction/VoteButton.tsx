import { MdOutlineHowToVote } from "react-icons/md";

import BlockButton from "@/components/interaction/BlockButton";

export default function VoteButton({ disabled }: { disabled: boolean }) {
    return (
        <BlockButton className="mt-8 w-full" type="submit" disabled={disabled}>
            <MdOutlineHowToVote className="mr-1 inline-block size-4 translate-y-[-.1rem]" />
            <span>Vote</span>
        </BlockButton>
    );
}
