// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],

  env: {
    browser: true,
  },

  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": [2, { ignore: ["^@env$"] }],
  },
};
