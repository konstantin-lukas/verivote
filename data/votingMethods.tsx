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
                <b>Majority support guaranteed:</b> The winner is more likely to have broad support since the system eliminates the lowest-ranked candidates progressively.
            </li>,
            <li key={1}>
                <b>Reduces "wasted votes":</b> Allows voters to support less popular candidates without fear of wasting their vote, as their vote is transferred if their first choice is eliminated.
            </li>,
            <li key={2}>
                <b>Discourages tactical voting:</b> Since votes are transferred, voters are less likely to vote strategically for a less-preferred candidate just to block another candidate.
            </li>,
            <li key={3}>
                <b>Spoiler effect minimized:</b> Helps avoid situations where a less popular candidate <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">splits the vote</Link>, allowing a less-preferred candidate to win.
            </li>,
        ],
        cons: [
            <li key={0}>
                <b>Complex to understand and execute:</b> The ranking and elimination process can confuse some voters, especially in casual settings.
            </li>,
            <li key={1}>
                <b>Time-consuming to count:</b> Recalculating after each elimination makes the counting process longer and harder to manage manually.
            </li>,
            <li key={2}>
                <b>Can still lead to strategic voting:</b> Voters can still manipulate rankings to influence which candidates get eliminated early. However, this is unlikely to happen in practice, especially with larger voter populations, because of the complexity of the system.
            </li>,
            <li key={3}>
                <b>Not proportional:</b> If used in multi-winner elections, it can fail to reflect proportional support across groups or ideologies.
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
                <b>Reflects detailed preferences:</b> It captures not only the voters' top choice but also their preferences for all other options.
            </li>,
            <li key={1}>
                <b>Fairer than single-choice systems:</b> Voters can express support for multiple candidates, reducing the likelihood of strategic voting for just the top choice.
            </li>,
            <li key={2}>
                <b>Encourages more engagement:</b> Voters need to think about their rankings, leading to more informed decisions.
            </li>,
            <li>
                <b>Can prevent spoilers:</b> Ranking multiple candidates reduces the chances that a third-party or less popular candidate <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">"spoils"</Link> the election.
            </li>,
        ],
        cons: [
            <li key={0}>
                <b>More complex to understand:</b> Requires voters to rank all candidates, which can be confusing or time-consuming for casual participants.
            </li>,
            <li key={1}>
                <b>Susceptible to strategic voting:</b> Voters might <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">deliberately</Link> rank a weaker candidate higher to push down a stronger rival.
            </li>,
            <li>
                <b>Points can distort results:</b> The point distribution may not perfectly reflect voter sentiment, as some positions may carry disproportionate weight.
            </li>,
            <li key={3}>
                <b>Challenging to count manually:</b> Ranking and assigning points increases the complexity of counting, making it less suitable for larger groups or informal polls.
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
                <b>Expresses preference strength:</b> Voters can show exactly how much they prefer one candidate over another, offering more nuanced feedback.
            </li>,
            <li key={1}>
                <b>Simple to use:</b> Voters only need to assign a score, making it intuitive and easy to understand for participants.
            </li>,
            <li key={2}>
                <b>No spoilers or vote splitting:</b> Since all candidates are rated independently, voters can support multiple candidates without worrying about splitting their vote.
            </li>,
            <li key={3}>
                <b>Proportional support:</b> Candidates are rewarded according to the strength of support from all voters, not just the most committed supporters.
            </li>,
        ],
        cons: [
            <li key={0}>
                <b>Strategic voting is possible:</b> Voters might exaggerate scores (<Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">maximizing scores</Link> for their favorite and minimizing others) to help their preferred candidate. If everyone does this, it is essentially a <Link href="/plurality-voting" className="inline-link inline-link-resting">plurality vote</Link>.
            </li>,
            <li key={1}>
                <b>May favor polarizing candidates:</b> Candidates who inspire strong feelings may receive very high or very low scores, leading to extreme outcomes.
            </li>,
            <li key={2}>
                <b>Harder to count for larger polls:</b> Although simpler than IRV, collecting and totaling scores for multiple candidates can become difficult for larger groups.
            </li>,
            <li key={3}>
                <b>Unclear winner legitimacy:</b> A candidate could win without being anyone’s top choice if they receive consistently middling scores from many voters.
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
                <b>Simple and easy to use:</b> Voters just select all the candidates they support, without needing to rank or score them.
            </li>,
            <li key={1}>
                <b>Supports multiple candidates:</b> Voters can express approval for more than one candidate, which reduces vote-splitting between similar candidates.
            </li>,
            <li key={2}>
                <b>Reduces the spoiler effect:</b> By allowing voters to approve of multiple candidates, it mitigates the problem of <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">vote splitting</Link> between similar candidates.
            </li>,
            <li key={3}>
                <b>Efficient counting:</b> It’s straightforward to count approvals, making it suitable for quick results even in larger groups.
            </li>,
        ],
        cons: [
            <li key={0}>
                <b>No preference strength shown:</b> It does not capture the intensity of a voter’s preference, as all approved candidates are treated equally.
            </li>,
            <li key={1}>
                <b>Can result in compromise candidates:</b> Since voters might approve of many candidates, a candidate with broad but lukewarm support may win over a strongly preferred candidate.
            </li>,
            <li key={2}>
                <b>Strategic voting possible:</b> Voters might limit their approvals to only their top choice to avoid helping a competitor.
            </li>,
            <li key={3}>
                <b>Difficult for polarized groups:</b> In situations where voters have strong preferences, this system may fail to reflect the deep divide in preferences.
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
                <b>Widely used and familiar:</b> Many people are familiar with this method, as it’s the standard system for most elections.
            </li>,
            <li key={1}>
                <b>Fast and easy to count:</b> The counting process is straightforward, making it ideal for quick decisions in small or large groups.
            </li>,
        ],
        cons: [
            <li key={0}>
                <b>Doesn’t reflect preferences:</b> Voters only select one candidate, which doesn’t show their feelings about other options.
            </li>,
            <li key={1}>
                <b>Leads to vote-splitting:</b> Candidates with similar platforms can split the vote, allowing a less popular candidate to win.
            </li>,
            <li key={2}>
                <b>Spoiler effect:</b> A third-party candidate can <Link href="https://en.wikipedia.org/wiki/Spoiler_effect" className="inline-link inline-link-resting">cause a candidate</Link> to win with only a small plurality, even without majority support.
            </li>,
            <li key={3}>
                <b>Encourages tactical voting:</b> Voters often vote for the <Link href="https://en.wikipedia.org/wiki/Strategic_voting" className="inline-link inline-link-resting">"lesser of two evils"</Link> instead of their true favorite to avoid wasting their vote.
            </li>,
            <li key={4}>
                <b>Fails to ensure majority support:</b> A candidate can win without having the majority of the vote, which might not reflect the true will of the group.
            </li>,
        ],
    },
];
