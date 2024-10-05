import Image from "next/image";
import Link from "next/link";
import React from "react";

import Card from "@/components/routes/home/Card";
import ScrollDownButton from "@/components/ScrollDownButton";
import H1 from "@/components/shared/H1";
import Logo from "@/components/shared/Logo";
import Wrapper from "@/components/shared/Wrapper";
import illustration from "@/public/undraw_election_day_w842.svg";
export default async function Page() {
    return (
        <Wrapper>
            <div
                className="flex min-h-dvh flex-col items-start justify-center desktop:min-h-[calc(100dvh-var(--header-height))] desktop:flex-row
                desktop:items-center">
                <div className="mb-4 mt-20 block desktop:hidden">
                    <Logo/>
                </div>
                <div className="my-16 hidden desktop:my-0 desktop:block desktop:w-1/2">
                    <Image
                        src={illustration}
                        alt="Illustration of a woman casting a vote."
                        className="select-none pr-8"
                        draggable={false}
                        priority
                    />
                </div>
                <div className="desktop:w-1/2">
                    <div className="hidden desktop:block">
                        <H1>Because Voting Matters</H1>
                    </div>
                    <p>
                        Most voting systems in use today are imperfect and often leave people feeling unsatisfied.
                        They limit you to casting a single vote, without considering your full preferences.
                        Verivote aims to educate people about alternative voting methods, offering a way to explore
                        different systems with small polls among friends. It&#39;s a simple, interactive way to learn
                        how
                        these alternative voting and counting methods work, providing a more accurate reflection of
                        group preferences.
                    </p>
                    <ScrollDownButton/>
                </div>
            </div>
            <div className="min-h-dvh py-[20dvh] desktop:min-h-[calc(100dvh-var(--header-height))]" id="anchor">
                <div className="grid grid-cols-1 gap-x-16 gap-y-24 xl:grid-cols-2">
                    <Card
                        heading="Instant-Runoff Voting"
                        href="/create/runoff"
                        tag="Recommended"
                        bestFor="Groups of any size where majority support is essential, and preferences between candidates are clear."
                        pros={<>Eliminates the <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">spoiler effect</Link> by redistributing votes, ensuring the winner has broad support.</>}
                        cons={"The vote counting process is complex and thus less transparent than other methods."}
                    >
                        Instant-Runoff Voting allows voters to rank candidates. If no candidate secures a
                        majority, the lowest-ranked candidate is eliminated, and their votes are
                        redistributed to the next preference until a candidate wins by majority.
                    </Card>
                    <Card
                        heading="Positional Voting"
                        href="/create/positional"
                        bestFor="Medium-sized polls (5-20 people) with multiple choices, where detailed preferences matter."
                        pros={"Provides a balanced reflection of voter preferences across all candidates, not just the favorite."}
                        cons={<>Can still lead to <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">tactical voting</Link>, as the point system may encourage voters to manipulate rankings.</>}
                    >
                        In Positional Voting, voters rank candidates, and each position on the ballot is assigned a
                        specific point value. Candidates earn points based on their ranking, and the candidate with the
                        highest total wins.
                    </Card>
                    <Card
                        heading="Score Voting"
                        href="/create/positional/score"
                        bestFor="Medium-sized groups (5-20 people) who want more flexibility to express their intensity of preference."
                        pros={"Allows voters to express varying levels of support for each candidate, offering a nuanced reflection of preferences."}
                        cons={<>Can be prone to <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">strategic voting</Link> if voters inflate or deflate scores to influence outcomes which is why it is not good for large groups.</>}
                    >
                        In Score Voting, voters rate each candidate on a numerical scale. The candidate with the
                        highest total score across all ballots is declared the winner.
                    </Card>
                    <Card
                        heading="Approval Voting"
                        href="/create/positional/approval"
                        bestFor="Small to medium-sized groups (up to 20 people) who want a quick, simple poll and don’t have extreme preferences between options."
                        pros={<>Simple to understand and count, and it allows voters to support multiple candidates without <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">splitting the vote</Link>.</>}
                        cons={"Does not account for the strength of preference, which can lead to less nuanced results than with score voting."}
                    >
                        Approval Voting lets voters select as many candidates as they approve of, without ranking them.
                        The candidate with the most approvals wins.
                    </Card>
                    <Card
                        heading="Plurality Voting"
                        href="/create/positional/plurality"
                        bestFor="Small groups (less than 10 people) when simplicity is most important, and the group is likely to have a clear favorite candidate or option."
                        pros={"Straightforward and easy to implement, especially for large elections. Everyone understands how it works."}
                        cons={<>Can result in <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">"spoiler" candidates</Link>, where the winner lacks majority support, and doesn't reflect the full spectrum of voter preferences.</>}
                    >
                        In Plurality Voting, voters choose only one candidate, and the candidate with the most votes wins. This is the typical voting system we're all familiar with.
                    </Card>
                </div>
            </div>
        </Wrapper>
    );
}