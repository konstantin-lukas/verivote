import type { Metadata } from "next";
import React from "react";

import DeleteAccount from "@/components/routes/account/DeleteAccount";
import WrapperSmall from "@/components/shared/WrapperSmall";

export const metadata: Metadata = {
    title: "Account - Verivote",
};

export default async function Page() {
    return (
        <WrapperSmall className="flex min-h-[var(--main-height-mobile)] items-center justify-center desktop:min-h-[var(--main-height)]">
            <DeleteAccount/>
        </WrapperSmall>
    );
}