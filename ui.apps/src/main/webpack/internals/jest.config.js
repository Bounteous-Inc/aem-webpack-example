module.exports = {
  "roots": [
    "../../content/jcr_root/"
  ],
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.js$",
  "transform": {
    "^.+\\.js$": "./jest.preprocessor.js"
  }
};
