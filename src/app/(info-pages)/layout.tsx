import type { ReactNode } from "react";

import Wrapper from "@/components/layout/Wrapper";

export default function Layout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return <Wrapper>{children}</Wrapper>;
}
