import { describe, expect, test } from "@jest/globals";

import type { Vote } from "@/types/vote";
import {
    getApprovalOrPluralityResults,
    getInstantRunoffResults,
    getPositionalResults,
    getScoreResults,
} from "@/utils/results";

describe("utils/shared", () => {
    describe("getInstantRunoffResults", () => {
        test.each([
            // REGULAR VOTES
            {
                votes: [
                    { selection: [1, 0, 3, 2] },
                    { selection: [1, 2, 0, 3] },
                    { selection: [2, 3, 0, 1] },
                    { selection: [2, 3, 1, 0] },
                    { selection: [0, 3, 2, 1] },
                ],
                expected: [0, 2, 3, 0],
                choiceCount: 4,
            },
            // SINGLE VOTE
            {
                votes: [{ selection: [1, 3, 2, 0] }],
                expected: [0, 1, 0, 0],
                choiceCount: 4,
            },
            // VOTES WHERE LAST CANDIDATE FROM FIRST ROUND APPEARS AS SECOND OPTION IN SOME VOTES
            {
                votes: [{ selection: [1, 0, 3, 2] }, { selection: [2, 0, 1, 3] }, { selection: [3, 0, 2, 1] }],
                expected: [0, 1, 1, 1],
                choiceCount: 4,
            },
            // VOTES WHERE TWO ELIMINATED CANDIDATES ARE FOUND IN THE SECOND ROUND
            {
                votes: [{ selection: [0, 3, 4, 1, 2] }, { selection: [1, 3, 4, 0, 2] }, { selection: [2, 3, 4, 0, 1] }],
                expected: [2, 1, 0, 0, 0],
                choiceCount: 5,
            },
            {
                votes: [
                    { selection: [5, 3, 4, 1, 0, 2] },
                    { selection: [0, 3, 4, 1, 2, 5] },
                    { selection: [1, 3, 4, 0, 2, 5] },
                    { selection: [2, 3, 4, 0, 1, 5] },
                ],
                expected: [2, 2, 0, 0, 0, 0],
                choiceCount: 6,
            },
            // TWO LOSING CANDIDATES IN FIRST ROUND
            {
                votes: [{ selection: [0, 1, 2] }, { selection: [2, 1, 0] }],
                expected: [1, 0, 1],
                choiceCount: 3,
            },
            // TIE
            {
                votes: [{ selection: [0, 1] }, { selection: [1, 0] }],
                expected: [1, 1],
                choiceCount: 2,
            },
            // NO VOTES
            {
                votes: [],
                expected: [0, 0],
                choiceCount: 2,
            },
        ])("should calculate instant-runoff voting results correctly", ({ votes, choiceCount, expected }) => {
            expect(getInstantRunoffResults(votes as Vote[], choiceCount)).toStrictEqual(expected);
        });
    });
    describe("getApprovalOrPluralityResults", () => {
        test.each([
            // NO VOTES (PLURALITY)
            {
                votes: [],
                expected: [0, 0, 0, 0],
                choiceCount: 4,
            },
            // SINGLE VOTE (PLURALITY)
            {
                votes: [{ selection: [3] }],
                expected: [0, 0, 0, 1],
                choiceCount: 4,
            },
            // REGULAR VOTES (PLURALITY)
            {
                votes: [{ selection: [3] }, { selection: [0] }, { selection: [2] }, { selection: [0] }],
                expected: [2, 0, 1, 1],
                choiceCount: 4,
            },
            // NO VOTES (APPROVAL)
            {
                votes: [],
                expected: [0, 0, 0, 0],
                choiceCount: 4,
            },
            // SINGLE VOTE (APPROVAL)
            {
                votes: [{ selection: [3] }],
                expected: [0, 0, 0, 1],
                choiceCount: 4,
            },
            // REGULAR VOTES (APPROVAL)
            {
                votes: [{ selection: [3, 2] }, { selection: [3, 0] }, { selection: [1, 2, 3] }, { selection: [0, 3] }],
                expected: [2, 1, 2, 4],
                choiceCount: 4,
            },
        ])("should calculate approval or plurality voting results correctly", ({ votes, choiceCount, expected }) => {
            expect(getApprovalOrPluralityResults(votes as Vote[], choiceCount)).toStrictEqual(expected);
        });
    });
    describe("getScoreResults", () => {
        test.each([
            // NO VOTES
            {
                votes: [],
                expected: [0, 0, 0, 0],
                choiceCount: 4,
            },
            // SINGLE VOTE
            {
                votes: [{ selection: [9, 3, 1, 10] }],
                expected: [9, 3, 1, 10],
                choiceCount: 4,
            },
            // TIE
            {
                votes: [{ selection: [0, 1] }, { selection: [1, 0] }],
                expected: [1, 1],
                choiceCount: 2,
            },
            // REGULAR VOTES + TIE
            {
                votes: [
                    { selection: [9, 3, 1, 10] },
                    { selection: [2, 5, 2, 1] },
                    { selection: [1, 7, 2, 9] },
                    { selection: [10, 2, 2, 2] },
                ],
                expected: [22, 17, 7, 22],
                choiceCount: 4,
            },
        ])("should calculate score voting results correctly", ({ votes, choiceCount, expected }) => {
            expect(getScoreResults(votes as Vote[], choiceCount)).toStrictEqual(expected);
        });
    });
    describe("getPositionalResults", () => {
        test.each([
            // NO VOTES
            {
                votes: [],
                expected: [0, 0, 0, 0],
                choiceCount: 4,
            },
            // SINGLE VOTE
            {
                votes: [{ selection: [1, 3, 2, 0] }],
                expected: [1, 4, 2, 3],
                choiceCount: 4,
            },
            // REGULAR VOTES
            {
                votes: [
                    { selection: [1, 3, 2, 0] },
                    { selection: [2, 1, 0, 3] },
                    { selection: [1, 2, 0, 3] },
                    { selection: [3, 2, 0, 1] },
                    { selection: [0, 3, 1, 2] },
                ],
                expected: [11, 14, 13, 12],
                choiceCount: 4,
            },
            // TIE
            {
                votes: [{ selection: [0, 1] }, { selection: [1, 0] }],
                expected: [3, 3],
                choiceCount: 2,
            },
        ])("should calculate positional voting results correctly", ({ votes, choiceCount, expected }) => {
            expect(getPositionalResults(votes as Vote[], choiceCount)).toStrictEqual(expected);
        });
    });
});
