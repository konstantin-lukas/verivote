import Image from "next/image";
import React from "react";

import Card from "@/components/routes/home/Card";
import H1 from "@/components/shared/H1";
import ScrollDownButton from "@/components/shared/ScrollButton";
import Wrapper from "@/components/shared/Wrapper";
import { votingMethods } from "@/content/votingMethods";
import illustration from "@/public/undraw_election_day_w842.svg";

export default async function Page() {
    return (
        <div>
            <div className="h-dvh w-full overflow-hidden shadow-xl desktop:h-main-height-front">
                <Wrapper className="h-full">
                    <div className="relative flex h-full items-center">
                        <span
                            className="absolute bottom-0 right-0 hidden size-[75dvmax] max-h-[1440px]
                            max-w-[1440px] translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r
                            from-verivote-turquoise to-verivote-cyan md:block [@media(max-height:420px)]:hidden"
                        />
                        <Image
                            src={illustration}
                            alt=""
                            priority
                            draggable={false}
                            className="absolute hidden md:bottom-0 md:right-0 md:block md:h-[115dvh] md:w-auto
                            md:translate-x-1/3 md:translate-y-1/3"
                        />
                        <div className="md:w-1/2 md:-translate-y-16 [@media(max-height:530px)]:translate-y-0">
                            <H1>Voting Matters</H1>
                            <p className="my-2 leading-relaxed [@media(max-height:420px)]:hidden">
                                Want to create a poll and try out different voting methods? We’ve got you covered! From
                                ranked choice to approval voting, we make it easy to build and share polls with friends,
                                and we’ll even help you learn how each method works along the way. Let’s make voting
                                more fun and easy together!
                            </p>
                            <ScrollDownButton />
                        </div>
                    </div>
                </Wrapper>
            </div>
            <Wrapper>
                <div className="py-32" id="anchor">
                    <div className="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 xl:grid-cols-3">
                        {votingMethods.map(method => (
                            <Card votingMethod={method} key={method.name} />
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
}
