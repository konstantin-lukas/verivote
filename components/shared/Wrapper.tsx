import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto size-full w-10/12 max-w-screen-xl">
            {children}
        </div>
    );
}