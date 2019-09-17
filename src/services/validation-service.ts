import { DictionaryRow, ERROR } from "../types";

export const validateRows = (inputPairs: DictionaryRow[]) => {
    return inputPairs.map((pair) => {
        const errors: ERROR[] = [];
        const restPairs = inputPairs.filter((p) => p.id !== pair.id && p.domain.trim() !== "" && p.range.trim() !== "");

        // Check for duplicates
        if (
            restPairs.some((p) => p.domain === pair.domain && p.range === pair.range)
        ) {
            errors.push(ERROR.DUPLICATES);
        }

        // Check for forks
        if (
            restPairs.some((p) => p.domain === pair.domain && p.range !== pair.range)
        ) {
            errors.push(ERROR.FORKS);
        }

        // Check for cycles
        if (
            restPairs.some((p) => p.domain === pair.range && p.range === pair.domain)
        ) {
            errors.push(ERROR.CYCLES);
        }

        // Check for chains
        if (
            restPairs.some((p) => p.domain === pair.range && p.range !== pair.domain)
        ) {
            errors.push(ERROR.CHAINS);
        }

        // No error
        if (errors.length === 0) {
            errors.push(ERROR.NONE);
        }
        pair.errors = errors;
        return {
            ...pair,
        };
    });
};
