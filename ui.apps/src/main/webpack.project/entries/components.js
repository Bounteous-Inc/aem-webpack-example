/**
 * Uncomment the following line to include Babel's polyfill.
 * Note that this increases the size of the bundled JavaScript file.
 * So be smart about when and where to include the polyfill.
 */
// import 'babel-polyfill';

// https://webpack.js.org/guides/dependency-management/#require-context
const cache = {};

function importAll(r) {
  // r.keys().forEach((key) => {  // ES6
  r.keys().forEach(function (key) {
    cache[key] = r(key);
    return cache;
  });
}

// Include all files named "index.js" in a "webpack.modules/" folder.
importAll(require.context('./../../content/jcr_root/', true, /\/webpack\.module\/index\.js$/));
