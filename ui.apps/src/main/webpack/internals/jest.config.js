{
  "roots": ["../content/jcr_root/"],
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(js|jsx)$",
  "transform": {
    "^.+\\.jsx?$": "./internals/jest.preprocessor.js"
  }
}
