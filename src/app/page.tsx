import Image from "next/image";

import Card from "@/components/informational/Card";
import ScrollDownButton from "@/components/interaction/ScrollButton";
import Wrapper from "@/components/layout/Wrapper";
import H1 from "@/components/typography/H1";
import { VOTING_METHODS } from "@/const/misc";
import illustration from "@/static/undraw_election_day_w842.svg";

export default async function Page() {
    const bannerText = (
        <div className="md:w-1/2 md:-translate-y-16 [@media(max-height:530px)]:translate-y-0">
            <H1 customSizes="text-4xl sm:text-5xl md:text-6xl">Voting Matters</H1>
            <p className="my-2 leading-relaxed [@media(max-height:420px)]:hidden">
                Want to create a poll and try out different voting methods? We’ve got you covered! From ranked choice to
                approval voting, we make it easy to build and share polls with friends, and we’ll even help you learn
                how each method works along the way. Let’s make voting more fun and easy together!
            </p>
            <ScrollDownButton />
        </div>
    );

    const banner = (
        <div className="desktop:h-main-height-front h-dvh w-full overflow-hidden shadow-xl">
            <Wrapper className="h-full">
                <div className="relative flex h-full items-center">
                    <span className="from-verivote-turquoise to-verivote-cyan absolute bottom-0 right-0 hidden size-[75dvmax] max-h-[1440px] max-w-[1440px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r md:block [@media(max-height:420px)]:hidden" />
                    <Image
                        src={illustration}
                        alt=""
                        priority
                        draggable={false}
                        className="absolute hidden md:bottom-0 md:right-0 md:block md:h-[115dvh] md:w-auto md:translate-x-1/3 md:translate-y-1/3"
                    />
                    {bannerText}
                </div>
            </Wrapper>
        </div>
    );

    const votingMethodsOverview = (
        <Wrapper>
            <div className="pb-32 pt-48" id="anchor">
                <div className="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 xl:grid-cols-3">
                    {VOTING_METHODS.map(method => (
                        <Card votingMethod={method} key={method.name} />
                    ))}
                </div>
            </div>
        </Wrapper>
    );

    return (
        <div>
            {banner}
            {votingMethodsOverview}
        </div>
    );
}
