// https://webpack.js.org/guides/dependency-management/#require-context
var cache = {};

function importAll(r) {
  r.keys().forEach(key => cache[key] = r(key));
}

// Include all files named "index.js" in a "webpack.modules/" folder.
importAll(require.context('./../../content/jcr_root/', true, /\/webpack\.module\/index\.js$/));
