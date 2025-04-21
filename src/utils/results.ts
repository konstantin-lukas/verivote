import { VotingMethod } from "@/enum/poll";
import type { Poll, PollResult } from "@/types/poll";
import type { Vote } from "@/types/vote";

export function getPositionalResults(votes: Vote[], choiceCount: number) {
    const results = new Array<number>(choiceCount).fill(0);
    for (const vote of votes) {
        for (let i = 0; i < vote.selection.length; i++) {
            const choice = vote.selection[i];
            results[choice] += choiceCount - i;
        }
    }
    return results;
}

export function getApprovalOrPluralityResults(votes: Vote[], choiceCount: number) {
    const results = new Array<number>(choiceCount).fill(0);
    for (const vote of votes) {
        for (const i of [...Array(choiceCount).keys()]) {
            const choice = vote.selection[i];
            results[choice]++;
        }
    }
    return results;
}

export function getScoreResults(votes: Vote[], choiceCount: number) {
    const results = new Array<number>(choiceCount).fill(0);
    for (const vote of votes) {
        for (let i = 0; i < vote.selection.length; i++) {
            results[i] += vote.selection[i];
        }
    }
    return results;
}

export function getPollResults(poll: Poll): PollResult {
    let results;
    switch (poll.votingMethod) {
        case VotingMethod.PLURALITY_VOTING:
        case VotingMethod.APPROVAL_VOTING:
            results = getApprovalOrPluralityResults(poll.votes, poll.options.length);
            break;
        case VotingMethod.SCORE_VOTING:
            results = getScoreResults(poll.votes, poll.options.length);
            break;
        case VotingMethod.POSITIONAL_VOTING:
            results = getPositionalResults(poll.votes, poll.options.length);
            break;
        case VotingMethod.INSTANT_RUNOFF_VOTING:
            results = getPositionalResults(poll.votes, poll.options.length);
            break;
    }
    return {
        voterCount: poll.votes.length,
        winners: [],
        options: poll.options,
        results,
    };
}
