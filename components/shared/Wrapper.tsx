import React from "react";

export default function Wrapper({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={"mx-auto size-full w-10/12 max-w-screen-xl " + (className ?? "")}>
            {children}
        </div>
    );
}