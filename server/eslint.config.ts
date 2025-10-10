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
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
