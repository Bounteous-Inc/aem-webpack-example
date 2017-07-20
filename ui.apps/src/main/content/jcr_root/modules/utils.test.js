/**
 * Tests using Jasmine 2 - the default library for Jest
 * Documentation: https://facebook.github.io/jest/docs/expect.html
 */

import {
  isEmpty
} from './utils.js';

test('isEmpty with empty object should be true', () => {
  const emptyObject = {};
  expect(isEmpty(emptyObject)).toBeTruthy();
});

test('isEmpty with object and properties should be false', () => {
  const nonEmptyObject = {
    property: 'value',
  };
  expect(isEmpty(nonEmptyObject)).toBeFalsy();
});
