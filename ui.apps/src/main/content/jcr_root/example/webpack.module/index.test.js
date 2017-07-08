/**
 * Tests using Jasmine 2 - the default library for Jest
 * Documentation: http://facebook.github.io/jest/
 */

import {
  isEditMode
} from './index.js';

test('isEditMode should return Boolean', () => {
  expect(isEditMode()).toBe(false);
});
