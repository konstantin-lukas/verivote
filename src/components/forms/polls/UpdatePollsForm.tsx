"use client";

import { format } from "date-fns";
import Image from "next/image";
import type { ReactNode } from "react";
import { startTransition, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuBrush, LuEye } from "react-icons/lu";

import Modal from "@/components/alert/Modal";
import BlockButton from "@/components/interaction/BlockButton";
import BlockLink from "@/components/navigation/BlockLink";
import H1 from "@/components/typography/H1";
import H2 from "@/components/typography/H2";
import { LONG_DATE_FORMAT } from "@/const/date";
import { VOTING_METHODS } from "@/const/misc";
import useDeletePoll from "@/hooks/actions/useDeletePoll";
import illustration from "@/static/undraw_the_search_s0xf.svg";
import type { Poll } from "@/types/poll";

function PollCard({ poll, setModalContent }: { poll: Poll; setModalContent: () => void }) {
    const info = VOTING_METHODS.find(x => x.dbId === poll.votingMethod);
    return (
        <div className="flex flex-col justify-between">
            <div>
                <div className="max-h-26 sm:max-h-29 after:bg-linear-0 sm:after:top-18 relative select-none overflow-hidden after:absolute after:left-0 after:top-16 after:h-8 after:w-full after:from-neutral-100 after:to-neutral-100/50 after:transition-colors after:content-[''] sm:after:h-10 dark:after:from-neutral-900 dark:after:to-neutral-900/50">
                    <H2>{poll.title}</H2>
                </div>
                <span className="mb-2 block text-xl font-bold uppercase">{info?.name}</span>
                <p className="line-clamp-2">
                    <b>Options:</b> {poll.options.join(", ")}
                </p>
                <span>
                    <b>Closing date:</b> {format(poll.closingTime, LONG_DATE_FORMAT)}
                </span>
            </div>
            <div>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <BlockLink href={`/poll/${poll.id}`} className="mt-6 flex grow justify-center">
                        <LuEye className="mr-1 inline translate-y-[-0.1em]" />
                        <span>View</span>
                    </BlockLink>
                    <BlockButton className="mt-6 flex grow justify-center" onClick={setModalContent}>
                        <FaRegTrashAlt className="mr-1 inline translate-y-[-0.1em]" />
                        <span>Delete</span>
                    </BlockButton>
                </div>
            </div>
        </div>
    );
}

export default function UpdatePollsForm({ polls }: { polls: Poll[] }) {
    const [remainingPolls, setRemainingPolls] = useState(polls);
    const [modalState, setModalState] = useState<{ message: ReactNode; id: string }>({
        message: null,
        id: "",
    });
    const { action } = useDeletePoll(modalState.id);

    const modal = (
        <Modal
            closeButtonText="Delete"
            cancelButtonText="Cancel"
            highlightCloseButton={true}
            onClose={() => {
                setRemainingPolls(prevState => prevState.filter(p => p.id !== modalState.id));
                startTransition(action);
            }}
            setChildren={() => setModalState({ message: null, id: "" })}
        >
            {modalState.message}
        </Modal>
    );

    const noPolls = (
        <div className="flex w-full flex-col items-center justify-center">
            <Image
                src={illustration}
                alt="A man holding a magnifying glass in front of a large mobile phone."
                priority
                draggable={false}
                className="mb-16 h-auto w-1/2 max-w-60"
            />
            <BlockLink href="/create">
                <LuBrush className="relative top-[-.1rem] inline" size="1rem" />
                <span className="ml-1">Create a poll</span>
            </BlockLink>
        </div>
    );

    const pollCards = remainingPolls.map(poll => (
        <PollCard
            key={poll.id}
            poll={poll}
            setModalContent={() => {
                setModalState({
                    message: `Are you sure you want to delete the poll titled "${poll.title}"?`,
                    id: poll.id!,
                });
            }}
        />
    ));

    return (
        <>
            <div className="mb-8 flex justify-center">
                <H1>{remainingPolls.length === 0 ? "No polls found" : "Edit your polls"}</H1>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:gap-24">{pollCards}</div>
            {remainingPolls.length === 0 && noPolls}
            {modal}
        </>
    );
}
