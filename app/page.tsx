import Image from "next/image";
import React from "react";

import MainHeading from "@/components/MainHeading";
import Wrapper from "@/components/Wrapper";
import illustration from "@/public/undraw_election_day_w842.svg";

export default async function Page() {
    return (
        <Wrapper>
            <div className="flex min-h-[var(--main-height)] items-center">
                <div className="w-1/2">
                    <Image src={illustration} alt="Illustration of a woman casting a vote."/>
                </div>
                <div className="w-1/2">
                    <MainHeading>Because Voting Matters</MainHeading>
                    <p>
                        The majority of today&#39;s election systems are imperfect, often leaving many voters
                        dissatisfied.
                        These systems typically limit you to casting a single vote and fail to consider your full range
                        of
                        preferences beyond your top choice. Verivote offers a solution by enabling the creation of polls
                        that utilize alternative voting and vote-counting methods, providing a more comprehensive
                        reflection
                        of voter preferences.
                    </p>
                </div>
            </div>
        </Wrapper>
    );
}