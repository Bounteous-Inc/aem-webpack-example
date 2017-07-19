# example-component/webpack.module

This is an example for a folder that gets picked up by Webpack and illustrates how to add JavaScript and SCSS to an AEM component: Place a folder named `webpack.module` within your component and add an `index.js` file.

Note the structure: `webpack.module/index.js`. This matches the pattern defined in [components.js](../../../../webpack/bundles/components.js). JavaScript files placed in a folder that doesn't follow the pattern will be ignored. Note also how `index.scss` is imported into `index.js` so Webpack extracts it into its a separate file just for CSS.
