/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '[type="search"]::-webkit-search-decoration': { display: "none" },
        '[type="search"]::-webkit-search-cancel-button': { display: "none" },
        '[type="search"]::-webkit-search-results-button': { display: "none" },
        '[type="search"]::-webkit-search-results-decoration': {
          display: "none",
        },
      });
    }),
  ],
};
