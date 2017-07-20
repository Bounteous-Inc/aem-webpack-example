/**
 * Checks if object has any key-value pairs.
 *
 * @param object
 *
 * @returns {boolean}
 */
export function isEmpty(object) {
  return Object.keys(object).length === 0;
}
