import React from "react";

export default function WrapperSmall({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={"mx-auto size-full w-10/12 max-w-screen-md " + (className ?? "")}>
            {children}
        </div>
    );
}