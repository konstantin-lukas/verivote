import Image from "next/image";
import React from "react";

import Card from "@/components/routes/home/Card";
import ScrollDownButton from "@/components/ScrollDownButton";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import illustration from "@/public/undraw_election_day_w842.svg";

export default async function Page() {
    return (
        <Wrapper>
            <div className="flex min-h-dvh items-center desktop:min-h-[var(--main-height)]">
                <div className="w-1/2">
                    <Image src={illustration} alt="Illustration of a woman casting a vote." className="pr-8" priority/>
                </div>
                <div className="w-1/2">
                    <H1>Because Voting Matters</H1>
                    <p>
                        Most voting systems in use today are imperfect and often leave people feeling unsatisfied.
                        They limit you to casting a single vote, without considering your full preferences.
                        Verivote aims to educate people about alternative voting methods, offering a way to explore
                        different systems with small polls among friends. It's a simple, interactive way to learn how
                        these alternative voting and counting methods work, providing a more accurate reflection of
                        group preferences.
                    </p>
                    <ScrollDownButton/>
                </div>
            </div>
            <div>
                <Card heading="Positional Voting">
                    In Positional Voting, voters rank candidates, and each position on the ballot is assigned a
                    specific point value. Candidates accumulate points based on their ranking, and the candidate with
                    the highest total wins.
                </Card>
            </div>
        </Wrapper>
    );
}