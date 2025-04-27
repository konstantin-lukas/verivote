import type { ReactNode } from "react";

export default function H1({
    children,
    className,
    customSizes,
    "data-test-id": testId,
}: {
    "children": ReactNode;
    "className"?: string;
    "customSizes"?: string;
    "data-test-id"?: string;
}) {
    const sizes = customSizes ?? "text-4xl sm:text-5xl";
    return (
        <h1
            data-test-id={testId}
            className={`from-verivote-turquoise to-verivote-cyan inline-block bg-gradient-to-r bg-clip-text pb-2 pt-1 font-bold uppercase text-transparent ${className ?? ""} ${sizes}`}
        >
            {children}
        </h1>
    );
}
