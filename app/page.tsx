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
            <div className="flex min-h-dvh items-center desktop:min-h-[calc(100dvh-var(--header-height))]">
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
                <Card heading="Instant-Runoff Voting">
                    Instant-Runoff Voting allows voters to rank candidates in order of preference. If no candidate
                    receives a majority, the candidate with the fewest votes is eliminated, and their votes are
                    redistributed according to the next preference, continuing until a candidate wins by majority.
                </Card>
                <Card heading="Score Voting">
                    In Score Voting, voters assign a score to each candidate, typically on a numerical scale.
                    The candidate with the highest total score across all ballots is declared the winner, allowing
                    for a more nuanced reflection of voter preferences.
                </Card>
                <Card heading="Approval Voting">
                    Approval Voting lets voters select as many candidates as they approve of, without ranking them.
                    The candidate with the most approvals wins, ensuring a straightforward but flexible voting process.
                </Card>
                <Card heading="Plurality Voting">
                    In Plurality Voting, voters choose only one candidate, and the candidate with the most votes wins.
                    This is the simplest form of voting, though it can lead to outcomes where the winner lacks majority
                    support.
                </Card>
            </div>
        </Wrapper>
    );
}