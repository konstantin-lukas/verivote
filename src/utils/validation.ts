export function isValidRankedSelection(selection: number[]) {
    const expectedSet = new Set([...Array(selection.length).keys()]);
    const actualSet = new Set(selection);

    if (expectedSet.size !== actualSet.size) return false;

    for (const value of expectedSet) {
        if (!actualSet.has(value)) return false;
    }
    return true;
}
