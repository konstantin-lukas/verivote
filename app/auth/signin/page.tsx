import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import React from "react";
import { RiDiscordLine, RiGithubLine } from "react-icons/ri";

import SignInButton from "@/components/routes/auth/SignInButton";
import Wrapper from "@/components/shared/Wrapper";


export default async function SignIn(context: {
    searchParams: {
        callbackUrl?: string,
    }
}) {
    const session = await getServerSession();
    if (session?.user) redirect(context.searchParams?.callbackUrl ?? "/");
    return (
        <div className="flex min-h-[var(--main-height-mobile)] items-center justify-center desktop:min-h-[var(--main-height)]">
            <Wrapper>
                <div
                    className="mx-auto box-border flex max-w-72 flex-col items-center justify-center p-8 shadow-3d-inset
                    dark:shadow-dark-3d-inset"
                >
                    <span className="inline-block bg-gradient-to-r from-verivote-turquoise to-verivote-cyan bg-clip-text
                    text-3xl font-bold uppercase text-transparent">
                        Sign In
                    </span>
                    <SignInButton serviceName="discord">
                        <RiDiscordLine className="mr-2 inline"/>
                        <span>Discord</span>
                    </SignInButton>
                    <SignInButton serviceName="github">
                        <RiGithubLine className="mr-2 inline"/>
                        <span>GitHub</span>
                    </SignInButton>
                </div>
            </Wrapper>
        </div>
    );
}
