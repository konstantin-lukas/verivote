import React from "react";

import Card from "@/components/routes/home/Card";
import H1 from "@/components/shared/H1";
import Wrapper from "@/components/shared/Wrapper";
import illustrationScore from "@/public/undraw_feedback_re_urmj.svg";
import illustrationRunoff from "@/public/undraw_jogging_re_k28i.svg";
import illustrationApproval from "@/public/undraw_like_dislike_re_dwcj.svg";
import illustrationPositional from "@/public/undraw_upvote_re_qn2k.svg";
import illustrationPlurality from "@/public/undraw_voting_nvu7.svg";
export default async function Page() {
    return (
        <Wrapper>
            <div className="mt-24">
                <H1>Because Voting Matters</H1>
            </div>
            <p>
                Most voting systems in use today are imperfect and often leave people feeling unsatisfied.
                They limit you to casting a single vote, without considering your full preferences.
                Verivote aims to educate people about alternative voting methods, offering a way to explore
                different systems with small polls among friends. It&#39;s a simple, interactive way to learn
                how these alternative voting and counting methods work, providing a more accurate reflection of
                group preferences.
            </p>
            <div className="py-24" id="anchor">
                <div className="grid grid-cols-1 gap-x-16 gap-y-24 md:grid-cols-2 xl:grid-cols-3">
                    <Card
                        heading="Instant-Runoff"
                        href="/create/runoff"
                        tag="Recommended"
                        illustration={illustrationRunoff}
                        illustrationAlt="Illustration of a man running with a coffe cup in his hand."
                        bestFor="Groups of any size where majority support is essential, and preferences between candidates are clear."
                    >
                        Voters rank candidates, the lowest-ranked candidate is eliminated and their votes redistributed
                        until a majority emerges.
                    </Card>
                    <Card
                        heading="Positional Voting"
                        href="/create/positional"
                        illustration={illustrationPositional}
                        illustrationAlt="Illustration of a man ranking choices on a screen."
                        bestFor="Medium-sized polls (5-20 people) with multiple choices, where detailed preferences matter."
                    >
                        Voters rank candidates which receive points based on their rank. The candidate with the most points wins.
                    </Card>
                    <Card
                        heading="Score Voting"
                        href="/create/positional/score"
                        illustration={illustrationScore}
                        illustrationAlt="Illustration of a man expressing his opinion with a star rating system."
                        bestFor="Medium-sized groups (5-20 people) who want more flexibility to express their intensity of preference."
                    >
                        Voters rate candidates on a point scale, points are accumulated and the candidate with the most points wins.
                    </Card>
                    <Card
                        heading="Approval Voting"
                        href="/create/positional/approval"
                        illustration={illustrationApproval}
                        illustrationAlt="Illustration of a woman holding up like and dislike signs."
                        bestFor="Small to medium-sized groups (up to 20 people) who want a simple poll and don’t have strong preferences."
                    >
                        Voters select as many candidates as they want, without ranking them. The candidate with the most approvals wins.
                    </Card>
                    <Card
                        heading="Plurality Voting"
                        href="/create/positional/plurality"
                        illustration={illustrationPlurality}
                        illustrationAlt="Illustration of a woman casting a ballot at a poll station."
                        bestFor="Small groups (less than 10 people) when simplicity important and there likely is a favorite candidate."
                    >
                        Voters choose only one candidate, and the candidate with the most votes wins. This is the typical voting system.
                    </Card>
                </div>
            </div>
        </Wrapper>
    );
}

/*
<Card
                        heading="Instant-Runoff"
                        href="/create/runoff"
                        tag="Recommended"
                        illustration={illustrationRunoff}
                        illustrationAlt="Illustration of a man in a low start position to start running."
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
                        illustration={illustrationPositional}
                        illustrationAlt="Illustration of a man ranking choices on a screen."
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
                        illustration={illustrationScore}
                        illustrationAlt="Illustration of a man expressing his opinion with a star rating system."
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
                        illustration={illustrationApproval}
                        illustrationAlt="Illustration of a woman holding up like and dislike signs."
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
                        illustration={illustrationPlurality}
                        illustrationAlt="Illustration of a woman casting a ballot at a poll station."
                        bestFor="Small groups (less than 10 people) when simplicity is most important, and the group is likely to have a clear favorite candidate or option."
                        pros={"Straightforward and easy to implement, especially for large elections. Everyone understands how it works."}
                        cons={<>Can result in <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">"spoiler" candidates</Link>, where the winner lacks majority support, and doesn't reflect the full spectrum of voter preferences.</>}
                    >
                        In Plurality Voting, voters choose only one candidate, and the candidate with the most votes wins. This is the typical voting system we're all familiar with.
                    </Card>

 */