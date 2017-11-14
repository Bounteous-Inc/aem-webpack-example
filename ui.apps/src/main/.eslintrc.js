module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "$": true,
    "Granite": true
  },
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "off"
  }
};
