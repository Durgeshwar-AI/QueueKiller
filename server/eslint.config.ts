import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import { globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "tests"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      ecamVersion: "latest",
      globals: globals.browser,
      ...globals.jest,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      semi: "error",
      "prefer-const": "error",
    },
    ignores: ["__tests/**"],
    linterOptions: {
      noInlineConfig: true
    }
  },
  tseslint.configs.recommended,
]);
