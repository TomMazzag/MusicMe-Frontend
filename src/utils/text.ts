export function shortenString(str: string, maxLength: number) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.slice(0, maxLength) + '...';
    }
}

/**
 * @param plural (Optional) If no plural is provided this function will return singular + 's'
 */
export function pluraliseAndReturnString(count: number, singular: string, plural?: string) {
    const word = count === 1 ? singular : plural || singular + 's';
    console.log(count, typeof count, count === 1, singular, word);
    return word;
}

/**
 * @param plural (Optional) If no plural is provided this function will return singular + 's'
 */
export function pluraliseAndReturnStringWithCount(count: number, singular: string, plural?: string) {
    const word = count === 1 ? singular : plural || singular + 's';
    return `${count} ${word}`;;
}
