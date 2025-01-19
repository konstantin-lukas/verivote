import type { Metadata } from "next";
import Image from "next/image";
import React from "react";

import illustration from "@/../public/undraw_throw_away_re_x60k.svg";
import DeleteAccount from "@/components/routes/account/DeleteAccount";
import WrapperSmall from "@/components/shared/WrapperSmall";

export const metadata: Metadata = {
    title: "Account - Verivote",
};

export default async function Page() {
    return (
        <WrapperSmall className="flex min-h-[var(--main-height-mobile)] flex-col items-center justify-center desktop:min-h-[var(--main-height)]">
            <Image src={illustration} alt="" priority draggable={false} className="mb-12 w-full max-w-96" />
            <DeleteAccount />
        </WrapperSmall>
    );
}
