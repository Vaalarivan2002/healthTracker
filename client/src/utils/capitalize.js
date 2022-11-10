export const uppercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toUpperCase());
export const lowercaseWords = str => str.replace(/^(.)|\s+(.)/g, c => c.toLowerCase());