export function isValidRankedSelection(selection: number[]) {
    const expectedSet = new Set([...Array(selection.length).keys()]);
    const actualSet = new Set(selection);

    if (expectedSet.size !== actualSet.size) return false;

    for (const value of expectedSet) {
        if (!actualSet.has(value)) return false;
    }
    return true;
}

export function isValidScoreSelection(selection: number[], expectedLength: number) {
    if (selection.length !== expectedLength) return false;
    for (const value of selection) {
        if (value < 1 || value > 10) return false;
    }
    return true;
}
