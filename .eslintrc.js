module.exports = {
  rules: {
    quotes: [2, "double"],
    "linebreak-style": [2, "unix"],
    semi: [2, "always"],
    "no-console": 0,
    "arrow-body-style": [2, "as-needed"],
    // "func-style": ["error", "declaration", { allowArrowFunctions: true }]
  },
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2021, // or higher, as needed
    // sourceType: 'script',
 },
  extends: ["eslint:recommended"]
};
