import type { Metadata } from "next";
import Image from "next/image";

import DeleteAccountForm from "@/components/forms/account/DeleteAccountForm";
import WrapperSmall from "@/components/layout/WrapperSmall";
import illustration from "@/static/undraw_throw_away_re_x60k.svg";

export const metadata: Metadata = {
    title: "Account - Verivote",
};

export default async function Page() {
    return (
        <WrapperSmall className="min-h-main-height-mobile desktop:min-h-main-height flex flex-col items-center justify-center">
            <Image src={illustration} alt="" priority draggable={false} className="mb-12 w-full max-w-96" />
            <DeleteAccountForm />
        </WrapperSmall>
    );
}
