import eslintPluginAstro from "eslint-plugin-astro";

export default [
  ...eslintPluginAstro.configs.base,
  {
    rules: {
      semi: "error",
      quotes: ["error", "double"],
      "prefer-const": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-parens": ["error", "as-needed"],
      "no-console": "warn"
    },
  }
];