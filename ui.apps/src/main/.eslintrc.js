module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "$": true,
    "Granite": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
  },
  "rules": {
    "no-console": "off",
    "no-unused-vars": ["warn"],
    "quotes": ["error", "single"],
    "semi": 2
  }
};
