
import js from "@eslint/js";
import globals from "globals";
import nodePlugin from "eslint-plugin-n";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Never lint build output, deps, or coverage reports
  globalIgnores(["node_modules/", "dist/", "coverage/", "build/"]),

  {
    files: ["**/*.js"],
    plugins: { js, n: nodePlugin },
    extends: ["js/recommended", "n/recommended-script"],
    languageOptions: {
      sourceType: "module", // set to "module" if you switch to import/export
      ecmaVersion: "latest",
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],       // nudge toward a real logger, don't block it
      "eqeqeq": "error",
      "curly": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "n/no-process-exit": "error",  // fail loudly in code review, not by killing the process
    },
  },

  // Must be last — turns off stylistic ESLint rules that fight Prettier
  eslintConfigPrettier,
]);