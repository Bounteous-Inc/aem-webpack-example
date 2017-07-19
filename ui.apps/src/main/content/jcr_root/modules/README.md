# JavaScript Modules

The JavaScript in this folder is meant to be generic and not tied to a specific component. Instead, import them in your component-specific JavaScript files (i.e. `webpack.module/index.js`). Only modules that get imported into at least one component-specific JavaScript file are going to be bundled. If a module isn't imported anywhere, it won't be bundled. This behavior is also known as [tree shaking](https://webpack.js.org/guides/tree-shaking/). (Tree shaking only happens if Webpack runs in production mode. Try `npm run deploy`.)
