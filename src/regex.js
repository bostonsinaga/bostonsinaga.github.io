/**
 * Checks whether the string is all dot characters.
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

/**
 * Checks whether a character is number.
 * @param {string} ch - test character
 * @returns {boolean}
 */
export function charIsNumber(ch) {
  return /^[0-9]$/.test(ch);
}

/**
 * Checks whether all the characters are number.
 * @param {string} str - test string
 * @returns {boolean}
 */
export function stringIsNumber(str) {
  return /^[0-9]+$/.test(str);
}
