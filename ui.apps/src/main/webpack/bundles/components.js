// https://webpack.js.org/guides/dependency-management/#require-context
let cache = {};

function importAll(r) {
    r.keys().forEach((key) => {
        return cache[key] = r(key);
    });
}

// Include all files named "index.js" in a "webpack.modules/" folder.
importAll(require.context('./../../content/jcr_root/', true, /\/webpack\.module\/index\.js$/));
