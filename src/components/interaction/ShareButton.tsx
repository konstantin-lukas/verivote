"use client";

import { useState } from "react";
import { FiClipboard } from "react-icons/fi";

import BlockButton from "@/components/interaction/BlockButton";

export default function ShareButton({ url, "data-test-id": testId }: { "url": string; "data-test-id"?: string }) {
    const [showMessage, setShowMessage] = useState(false);
    return (
        <div className="relative">
            <BlockButton
                data-test-id={testId}
                onClick={() => navigator.clipboard.writeText(url).then(() => setShowMessage(true))}
                className="flex items-center justify-center"
            >
                <FiClipboard className="mr-1 inline-block size-4 -translate-y-0.5" />
                <span>Share</span>
            </BlockButton>
            {showMessage && (
                <span
                    className="animate-fade-out from-verivote-turquoise to-verivote-cyan absolute bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2 rounded-xl bg-gradient-to-br px-4 py-2 text-center font-bold uppercase text-white"
                    onAnimationEnd={() => setShowMessage(false)}
                    data-test-id={`${testId}-message`}
                    data-url={url}
                >
                    Copied to clipboard!
                </span>
            )}
        </div>
    );
}
