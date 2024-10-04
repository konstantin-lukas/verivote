import Image from "next/image";
import Link from "next/link";
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
            <div className="min-h-dvh py-12 desktop:min-h-[calc(100dvh-var(--header-height))]">
                <div className="grid grid-cols-2 gap-x-16 gap-y-24">
                    <Card
                        heading="Positional Voting"
                        href="/create/positional"
                        pros={"Provides a balanced reflection of voter preferences across all candidates, not just the favorite."}
                        cons={"Can still lead to tactical voting, as the point system may encourage voters to manipulate rankings."}
                    >
                        In Positional Voting, voters rank candidates, and each position on the ballot is assigned a
                        specific point value. Candidates earn points based on their ranking, and the candidate with the
                        highest total wins.
                    </Card>
                    <Card
                        heading="Instant-Runoff Voting"
                        href="/create/runoff"
                        pros={<>Eliminates the <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">spoiler effect</Link> by redistributing votes, ensuring the winner has broad support.</>}
                        cons={"Complex to count manually and may result in longer voting processes."}
                    >
                        Instant-Runoff Voting allows voters to rank candidates by preference. If no candidate secures a
                        majority in the first round, the lowest-ranked candidate is eliminated, and their votes are
                        redistributed to the next preference, continuing until one candidate wins by majority.
                    </Card>
                    <Card
                        heading="Score Voting"
                        href="/create/positional/score"
                        pros={"Allows voters to express varying levels of support for each candidate, offering a nuanced reflection of preferences."}
                        cons={"Can be prone to strategic voting if voters inflate or deflate scores to influence outcomes."}
                    >
                        In Score Voting, voters rate each candidate on a numerical scale. The candidate with the
                        highest total score across all ballots is declared the winner.
                    </Card>
                    <Card
                        heading="Approval Voting"
                        href="/create/positional/approval"
                        pros={"Simple to understand and count, and it allows voters to support multiple candidates without splitting the vote."}
                        cons={"Does not account for the strength of preference, which can lead to less nuanced results."}
                    >
                        Approval Voting lets voters select as many candidates as they approve of, without ranking them.
                        The candidate with the most approvals wins.
                    </Card>
                    <Card
                        heading="Plurality Voting"
                        href="/create/positional/plurality"
                        pros={"Straightforward and easy to implement, especially for large elections."}
                        cons={`Can result in "spoiler" candidates, where the winner lacks majority support, and doesn't reflect the full spectrum of voter preferences.`}
                    >
                        In Plurality Voting, voters choose only one candidate, and the candidate with the most votes wins.
                    </Card>
                </div>
            </div>
        </Wrapper>
    );
}