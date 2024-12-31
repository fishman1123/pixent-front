// extractSentences.js
export function extractFirstTwoSentences(text) {
    if (!text) return '';
    // Match any sequence of non-period characters followed by a period.
    const matches = text.match(/[^.]*\./g) || [];
    // Take the first two matches, then join them back with a space.
    return matches.slice(0, 2).join(' ');
}
