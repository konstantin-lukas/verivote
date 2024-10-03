import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto h-full w-2/3 max-w-screen-xl">
            {children}
        </div>
    );
}