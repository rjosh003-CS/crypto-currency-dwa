module.exports = {
  rules: {
    quotes: [2, "double"],
    "linebreak-style": [2, "unix"],
    semi: [2, "always"],
    "no-console": 0,
    "arrow-body-style": [2, "as-needed"],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  extends: "eslint:recommended",
};
