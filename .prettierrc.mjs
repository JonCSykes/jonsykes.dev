/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "auto",
};