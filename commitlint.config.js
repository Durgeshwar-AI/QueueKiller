module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // type must be one of these
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "docs", "refactor", "test", "style", "ci"],
    ],

    // subject rules
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-max-length": [2, "always", 72],

    // scope rules
    "scope-case": [2, "always", ["kebab-case"]],
    "scope-empty": [1, "never"], // warn if missing
  },
};
