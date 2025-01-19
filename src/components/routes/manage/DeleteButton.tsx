"use client";

import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import BlockButton from "@/components/shared/BlockButton";

export default function DeleteButton({ testId }: { id: string; testId?: string }) {
    return (
        <>
            <BlockButton className="mt-6 flex grow justify-center" testId={testId}>
                <FaRegTrashAlt className="mr-1 inline translate-y-[-0.1em]" />
                <span>Delete</span>
            </BlockButton>
        </>
    );
}
