// extractSentences.js
export function extractFirstTwoSentences(text) {
    if (!text) return '';
    const matches = text.match(/[^.]*다\./g) || [];
    return matches.slice(0, 2).join(' ');
}
