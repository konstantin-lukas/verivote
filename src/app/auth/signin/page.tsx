import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { PiRedditLogo } from "react-icons/pi";
import { RiDiscordLine, RiGithubLine } from "react-icons/ri";
import { SiKeycloak } from "react-icons/si";

import SignInButton from "@/components/interaction/SignInButton";
import Wrapper from "@/components/layout/Wrapper";

export default async function SignIn(context: { searchParams: Promise<{ callbackUrl: string }> }) {
    const session = await getServerSession();
    if (session?.user) redirect((await context.searchParams)?.callbackUrl ?? "/");

    const heading = (
        <span className="from-verivote-turquoise to-verivote-cyan inline-block bg-gradient-to-r bg-clip-text text-3xl font-bold uppercase text-transparent">
            Sign In
        </span>
    );

    const buttons =
        process.env.NODE_ENV === "production" ? (
            <>
                <SignInButton serviceName="discord">
                    <RiDiscordLine className="mr-2 inline" />
                    <span>Discord</span>
                </SignInButton>
                <SignInButton serviceName="github">
                    <RiGithubLine className="mr-2 inline" />
                    <span>GitHub</span>
                </SignInButton>
                <SignInButton serviceName="reddit">
                    <PiRedditLogo className="mr-2 inline" />
                    <span>Reddit</span>
                </SignInButton>
            </>
        ) : (
            <SignInButton serviceName="keycloak">
                <SiKeycloak className="mr-2 inline" />
                <span>KeyCloak</span>
            </SignInButton>
        );

    return (
        <div className="min-h-main-height-mobile desktop:min-h-main-height flex items-center justify-center">
            <Wrapper>
                <div className="inset-shadow-3d dark:inset-shadow-dark-3d mx-auto box-border flex max-w-72 flex-col items-center justify-center p-8">
                    {heading}
                    {buttons}
                </div>
            </Wrapper>
        </div>
    );
}
