"use client";

import React, { useState } from "react";
import { FiClipboard } from "react-icons/fi";

import BlockButton from "@/components/shared/BlockButton";

export default function ShareButton({ url }: { url: string }) {
    const [showMessage, setShowMessage] = useState(false);
    return (
        <div className="relative">
            <BlockButton
                onClick={() => navigator.clipboard.writeText(url).then(() => setShowMessage(true))}
                className="flex items-center justify-center"
            >
                <FiClipboard className="mr-1 inline-block size-4 -translate-y-0.5"/>
                <span>Share</span>
            </BlockButton>
            {showMessage && <span
                className="absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 animate-fade-out rounded-xl
                bg-gradient-to-br from-verivote-turquoise to-verivote-cyan px-4 py-2 text-center font-bold uppercase
                text-white"
                onAnimationEnd={() => setShowMessage(false)}
            >
                Copied to clipboard!
            </span>}
        </div>
    );
}