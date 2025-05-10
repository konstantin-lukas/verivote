import { VotingMethod } from "@/enum/poll";
import type { Poll, PollResult } from "@/types/poll";
import type { Vote } from "@/types/vote";
import { findLargestIndices } from "@/utils/shared";

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
        for (const i of [...Array(vote.selection.length).keys()]) {
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

export function getInstantRunoffResults(votes: Vote[], choiceCount: number) {
    const remainingVotes = votes.map(vote => [...vote.selection]);
    const results = new Array<number>(choiceCount).fill(0);
    const eliminated = new Array<boolean>(choiceCount).fill(false);
    if (votes.length === 0) return results;

    // DISTRIBUTE FIRST CHOICES
    for (const vote of remainingVotes) {
        results[vote[0]]++;
    }

    // FIND THE FEWEST VOTES OF CANDIDATES STILL IN THE RACE
    for (let round = 0; round < choiceCount; round++) {
        // A: CHECK IF A SINGLE CANDIDATE HAS A MAJORITY; IF SO QUIT
        // B: FIND THE FEWEST AMOUNT OF VOTES OF NON-ELIMINATED CANDIDATES
        let fewestPossibleVotes = remainingVotes.length;
        for (const i of [...Array(results.length).keys()]) {
            const result = results[i];
            if (result > remainingVotes.length / 2) return results;
            if (result < fewestPossibleVotes && !eliminated[i]) fewestPossibleVotes = result;
        }

        // GET THE INDICES OF THE CANDIDATES WITH FEWEST VOTES
        const losers = [];
        for (const i of [...Array(results.length).keys()]) {
            if (results[i] === fewestPossibleVotes) losers.push(i);
        }

        // REDISTRIBUTE VOTES FOR THE CANDIDATE(S) IN LAST PLACE
        for (const i of [...Array(remainingVotes.length).keys()]) {
            if (remainingVotes[i].length > 1) {
                let offset = 1;
                const index = losers.findIndex(loser => loser === remainingVotes[i][0]);
                if (index > -1) {
                    while (remainingVotes[i].length > offset + 1 && eliminated[remainingVotes[i][offset]]) {
                        offset++;
                    }
                    results[remainingVotes[i][offset]]++;
                    results[losers[index]]--;
                    remainingVotes[i] = remainingVotes[i].slice(offset);
                }
            }
        }

        // ELIMINATE CANDIDATES WHO WERE ELIMINATED
        for (const loser of losers) {
            eliminated[loser] = true;
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
            results = getInstantRunoffResults(poll.votes, poll.options.length);
            break;
    }
    let winners = poll.votes.length > 0 ? findLargestIndices(results) : [];
    if (poll.winnerNeedsMajority) {
        const maxPossiblePoints = results.reduce((acc, points) => acc + points, 0);
        const maxAchievedPoints = results[winners[0]];
        if (maxAchievedPoints <= maxPossiblePoints / 2) winners = [];
    }
    return {
        voterCount: poll.votes.length,
        winners,
        options: poll.options,
        results,
    };
}
