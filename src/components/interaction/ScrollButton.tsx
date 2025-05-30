"use client";

import { RiArrowDownDoubleFill } from "react-icons/ri";

import BlockButton from "@/components/interaction/BlockButton";

export default function ScrollDownButton() {
    return (
        <BlockButton
            onClick={() => document.getElementById("anchor")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-4"
        >
            <span className="flex items-center justify-center">
                <RiArrowDownDoubleFill />
                <span className="ml-1">Explore</span>
            </span>
        </BlockButton>
    );
}
