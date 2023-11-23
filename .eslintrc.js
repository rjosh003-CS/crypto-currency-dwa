module.exports = {
  rules: {
    quotes: [2, "double"],
    "linebreak-style": [2, "unix"],
    semi: [2, "always"],
    "no-console": 0,
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parseOptions: {
    ecmaVersion: 2021
  },
  extends: "eslint:recommended",
};
