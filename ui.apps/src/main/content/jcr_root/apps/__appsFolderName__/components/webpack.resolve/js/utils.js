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

export const helloWorld = function () {
  return 'Hello world!';
};
