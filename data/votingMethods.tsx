import Link from "next/link";
import React from "react";

import type { VotingMethod } from "@/data/types";
import illustrationScore from "@/public/undraw_feedback_re_urmj.svg";
import illustrationRunoff from "@/public/undraw_jogging_re_k28i.svg";
import illustrationApproval from "@/public/undraw_like_dislike_re_dwcj.svg";
import illustrationPositional from "@/public/undraw_upvote_re_qn2k.svg";
import illustrationPlurality from "@/public/undraw_voting_nvu7.svg";

export const votingMethods: VotingMethod[] = [
    {
        name: "Instant-Runoff",
        shortDescription: "Voters rank candidates, the lowest-ranked candidate is eliminated and their votes " +
            "redistributed until a majority emerges.",
        longDescription: "Instant-Runoff Voting allows voters to rank candidates. If no candidate secures a " +
            "majority, the lowest-ranked candidate is eliminated, and their votes are redistributed to the next " +
            "preference until a candidate wins by majority.",
        infoPage: "/instant-runoff-voting",
        createPage: "/create?type=irv",
        illustration: illustrationRunoff,
        illustrationAlt: "Illustration of a man running with a coffe cup in his hand.",
        bestFor: "Groups of any size where majority support is essential, and preferences between candidates are clear.",
        pros: [
            <li key={0}>
                Eliminates the <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting"> spoiler effect</Link> by redistributing votes, ensuring the winner has broad support.
            </li>,
        ],
        cons: [
            <li key={0}>
                The vote counting process is complex and thus less transparent than other methods.
            </li>,
        ],
        tag: "Recommended",
    }, {
        name: "Positional Voting",
        shortDescription: "Voters rank candidates which receive points based on their rank. The candidate with the " +
            "most points wins.",
        longDescription: "In Positional Voting, voters rank candidates, and each position on the ballot is assigned " +
            "a specific point value. Candidates earn points based on their ranking, and the candidate with the " +
            "highest total wins.",
        infoPage: "/positional-voting",
        createPage: "/create?type=pos",
        illustration: illustrationPositional,
        illustrationAlt: "Illustration of a man ranking choices on a screen.",
        bestFor: "Medium-sized polls (5-20 people) with multiple choices, where detailed preferences matter.",
        pros: [
            <li key={0}>
                Provides a balanced reflection of voter preferences across all candidates, not just the favorite.
            </li>,
        ],
        cons: [
            <li key={0}>
                Can still lead to <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">tactical voting</Link>, as the point system may encourage voters to manipulate rankings.
            </li>,
        ],
        tag: "Recommended",
    }, {
        name: "Score Voting",
        shortDescription: "Voters rate candidates on a point scale, points are accumulated and the candidate with " +
            "the most points wins.",
        longDescription: "In Score Voting, voters rate each candidate on a numerical scale. The candidate with the" +
            "highest total score across all ballots is declared the winner.",
        infoPage: "/score-voting",
        createPage: "/create?type=scr",
        illustration: illustrationScore,
        illustrationAlt: "Illustration of a man expressing his opinion with a star rating system.",
        bestFor: "Medium-sized groups (5-20 people) who want more flexibility to express their intensity of preference.",
        pros: [
            <li key={0}>
                Allows voters to express varying levels of support for each candidate, offering a nuanced reflection of preferences.
            </li>,
        ],
        cons: [
            <li key={0}>
                Can be prone to <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">strategic voting</Link> if voters inflate or deflate scores to influence outcomes which is why it is not good for large groups.
            </li>,
        ],
    }, {
        name: "Approval Voting",
        shortDescription: "Voters select as many candidates as they want, without ranking them. The candidate with " +
            "the most approvals wins.",
        longDescription: "Approval Voting lets voters select as many candidates as they approve of, without ranking " +
            "them. The candidate with the most approvals wins.",
        infoPage: "/approval-voting",
        createPage: "/create?type=apr",
        illustration: illustrationApproval,
        illustrationAlt: "Illustration of a woman holding up like and dislike signs.",
        bestFor: "Small to medium-sized groups (up to 20 people) who want a simple poll and don’t have strong preferences.",
        pros: [
            <li key={0}>
                Simple to understand and count, and it allows voters to support multiple candidates without <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">splitting the vote</Link>.
            </li>,
        ],
        cons: [
            <li key={0}>
                Does not account for the strength of preference, which can lead to less nuanced results than with score voting.
            </li>,
        ],
    }, {
        name: "Plurality Voting",
        shortDescription: "Voters choose only one candidate, and the candidate with the most votes wins. This is the " +
            "typical voting system.",
        longDescription: "In Plurality Voting, voters choose only one candidate, and the candidate with the most " +
            "votes wins. This is the typical voting system we're all familiar with.",
        infoPage: "/plurality-voting",
        createPage: "/create?type=plu",
        illustration: illustrationPlurality,
        illustrationAlt: "Illustration of a woman casting a ballot at a polling station.",
        bestFor: "Small groups (less than 10 people) when simplicity important and there likely is a favorite candidate.",
        pros: [
            <li key={0}>
                Straightforward and easy to implement, especially for large elections. Everyone understands how it works.
            </li>,
        ],
        cons: [
            <li key={0}>
                Can result in <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">&#34;spoiler&#34; candidates</Link>, where the winner lacks majority support, and doesn&#39;t reflect the full spectrum of voter preferences.
            </li>,
        ],
    },
];
