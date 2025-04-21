import type { ReactNode } from "react";

export default function Wrapper({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto size-full w-10/12 max-w-screen-xl ${className ?? ""}`}>{children}</div>;
}
