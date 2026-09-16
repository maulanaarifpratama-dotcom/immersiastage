import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      globals: {
        // Hand-maintained rather than pulled from the `globals` package, so
        // anything standard but unlisted reads as an undefined variable. That
        // is what `URL` did: the artifact suite used it, CI failed on
        // no-undef, and the local check had been reporting success from an
        // `echo` rather than from eslint's exit code.
        URL: "readonly",
        window: "readonly",
        document: "readonly",
        location: "readonly",
        scrollTo: "readonly",
        clearInterval: "readonly",
        setInterval: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        vi: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      ...reactHooksPlugin.configs.recommended.rules,
    },
    settings: {
      react: { version: "detect" },
    },
  },
  { ignores: ["dist/", "node_modules/", "public/"] },
];
