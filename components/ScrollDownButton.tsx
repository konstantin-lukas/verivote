"use client";

import React from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";

import BlockButton from "@/components/shared/BlockButton";

export default function ScrollDownButton() {
    return (
        <BlockButton onClick={() => window.scrollTo({ top: window.screen.height, behavior: "smooth" })} className="mt-4">
            <span className="flex items-center justify-center">
                <RiArrowDownDoubleFill />
                <span className="ml-1">Explore</span>
            </span>
        </BlockButton>
    );
}