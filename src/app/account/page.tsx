import type { Metadata } from "next";
import Image from "next/image";
import React from "react";

import DeleteAccount from "@/components/routes/account/DeleteAccount";
import WrapperSmall from "@/components/shared/WrapperSmall";
import illustration from "@/public/undraw_throw_away_re_x60k.svg";

export const metadata: Metadata = {
    title: "Account - Verivote",
};

export default async function Page() {
    return (
        <WrapperSmall className="min-h-main-height-mobile desktop:min-h-main-height flex flex-col items-center justify-center">
            <Image src={illustration} alt="" priority draggable={false} className="mb-12 w-full max-w-96" />
            <DeleteAccount />
        </WrapperSmall>
    );
}
