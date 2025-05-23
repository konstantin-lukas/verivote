import type { ZodError, ZodSchema } from "zod";

import type { Result } from "@/types/result";

export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}

export function tryCatchSync<T, E = Error>(fn: () => T): Result<T, E> {
    try {
        const data = fn();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error as E };
    }
}

/**
 * @returns An error string or null if parsing was successful.
 */
export function parseSchema(schema: ZodSchema, data: unknown) {
    const { error } = tryCatchSync<unknown, ZodError>(() => schema.parse(data));
    const errors = error?.errors.map(e => e.message);
    if (!errors) return null;
    return [...new Set(errors)];
}

export function findLargestIndices(array: number[]) {
    const maxValue = Math.max(...array.filter(n => !isNaN(n)));
    return array.reduce((indices, value, index) => {
        if (value === maxValue) {
            indices.push(index);
        }
        return indices;
    }, [] as number[]);
}
