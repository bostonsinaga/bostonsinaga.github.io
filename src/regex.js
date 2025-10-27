/**
 * Checks if the string is all dot characters.
 * @param {string} str - test string
 * @returns {boolean}
 */
export function isStringAllDots(str) {
  return (/^\.+$/).test(str);
}

/**
 * Checks whether a string contains characters that
 * are forbidden for file names or directory names.
 * @param {string} str - test string
 * @returns {boolean}
 */
export function isIllegalCharacterFilename(str) {
  return /[!"#$%&*:<>/\\?|]/.test(str);
}
