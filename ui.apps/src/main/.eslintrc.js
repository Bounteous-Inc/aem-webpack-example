module.exports = {
  "extends": "eslint:recommended",
  // Optional: Replace `eslint:recommended` with `eslint-config-infield` and run `npm install --save-dev eslint-config-infield eslint` for stricter linting rules
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
