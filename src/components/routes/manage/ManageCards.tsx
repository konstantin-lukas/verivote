"use client";

import { format } from "date-fns";
import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuBrush, LuEye } from "react-icons/lu";

import { deletePoll } from "@/actions/poll";
import BlockButton from "@/components/shared/BlockButton";
import BlockLink from "@/components/shared/BlockLink";
import H1 from "@/components/shared/H1";
import H2 from "@/components/shared/H2";
import Modal from "@/components/shared/Modal";
import { LONG_DATE_FORMAT } from "@/const/date";
import { VOTING_METHODS } from "@/const/misc";
import useLoadingState from "@/hooks/useLoadingState";
import illustration from "@/public/undraw_the_search_s0xf.svg";
import type { Poll } from "@/types/poll";

function PollCard({ poll, setModalContent }: { poll: Poll; setModalContent: () => void }) {
    const info = VOTING_METHODS.find(x => x.dbId === poll.votingMethod);
    return (
        <div className="flex flex-col justify-between">
            <div>
                <H2>{poll.title}</H2>
                <span className="mb-2 block text-xl font-bold uppercase">{info?.name}</span>
                <p>Options: {poll.options.join(", ")}</p>
            </div>
            <div>
                <span>Closing date: {format(poll.closingTime, LONG_DATE_FORMAT)}</span>
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <BlockLink href={`/poll/${poll.id}`} className="mt-6 flex grow justify-center" testId="viewPoll">
                        <LuEye className="mr-1 inline translate-y-[-0.1em]" />
                        <span>View</span>
                    </BlockLink>
                    <BlockButton
                        className="mt-6 flex grow justify-center"
                        testId="deletePoll"
                        onClick={setModalContent}
                    >
                        <FaRegTrashAlt className="mr-1 inline translate-y-[-0.1em]" />
                        <span>Delete</span>
                    </BlockButton>
                </div>
            </div>
        </div>
    );
}

export default function ManageCards({ polls }: { polls: Poll[] }) {
    const [remainingPolls, setRemainingPolls] = useState(polls);
    const [modalState, setModalState] = useState<{ message: ReactNode; deleteAction: () => void }>({
        message: null,
        deleteAction: () => null,
    });
    const { setIsLoading } = useLoadingState();

    const modal = (
        <Modal
            closeButtonText="Delete"
            cancelButtonText="Cancel"
            highlightCloseButton={true}
            onClose={modalState.deleteAction}
            setChildren={() => setModalState({ message: null, deleteAction: () => null })}
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
                    deleteAction: async () => {
                        setIsLoading(true);
                        await deletePoll(poll.id!);
                        setIsLoading(false);
                        setRemainingPolls(prevState => prevState.filter(p => p.id !== poll.id));
                    },
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
