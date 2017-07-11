import './index.scss';

console.log('Works! Webpack bundled the JavaScript successfully.');

/**
 * Test if current page is in wcm "edit" mode.
 */
export function isEditMode() {
  return typeof Granite !== 'undefined' && Granite.author;
}
