import { describe, expect, test } from "@jest/globals";
import { addMinutes } from "date-fns";

import { PollCreateClientSchema } from "@/schemas/poll";
import { findLargestIndices, parseSchema, tryCatch, tryCatchSync } from "@/utils/shared";

describe("utils/shared", () => {
    describe("tryCatchSync", () => {
        test("should catch errors and return them as a value", () => {
            const { error, data } = tryCatchSync(() => {
                throw new Error();
            });
            expect(error).not.toBeNull();
            expect(data).toBeNull();
        });
        test("should catch errors and return them as a value", () => {
            const { error, data } = tryCatchSync(() => {
                return 42;
            });
            expect(error).toBeNull();
            expect(data).toBe(42);
        });
    });
    describe("tryCatch", () => {
        test("should catch errors and return them as a value", async () => {
            const { error, data } = await tryCatch(Promise.reject());
            expect(error).not.toBeNull();
            expect(data).toBeNull();
        });
        test("should catch errors and return them as a value", async () => {
            const { error, data } = await tryCatch(Promise.resolve(42));
            expect(error).toBeNull();
            expect(data).toBe(42);
        });
    });
    describe("parseSchema", () => {
        test("should catch top level errors and return them as values", async () => {
            const errors = parseSchema(PollCreateClientSchema, {});
            expect(errors).toStrictEqual([
                "The poll must have a title",
                "The closing time must be a valid date",
                "The poll must have options",
                "The information whether this poll's winner needs a majority is missing",
            ]);
        });
        test("should catch errors nested in the schema and return them as values", async () => {
            const errors = parseSchema(PollCreateClientSchema, {
                options: ["Test"],
            });
            expect(errors).toContain("A poll needs at least two options");
        });
        test("should not return any errors on a valid schema", async () => {
            const errors = parseSchema(PollCreateClientSchema, {
                title: "Test",
                closingTime: addMinutes(new Date(), 5),
                options: ["Test", "Test"],
                winnerNeedsMajority: true,
            });
            expect(errors).toBeNull();
        });
    });
    describe("findLargestIndices", () => {
        test.each([
            [[], []],
            [[1], [0]],
            [[1, 2, 3], [2]],
            [
                [1, 2, 3, 3],
                [2, 3],
            ],
            [
                [951, 251, 623, 737, 951, 222, 951],
                [0, 4, 6],
            ],
            [[-1, -2, -3], [0]],
            [[-2, -3, NaN], [0]],
            [[NaN, -2, -3], [1]],
        ])("should the indices with the largest values from its input", (input, expected) => {
            expect(findLargestIndices(input)).toStrictEqual(expected);
        });
    });
});
