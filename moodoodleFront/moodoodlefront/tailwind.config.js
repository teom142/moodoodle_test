/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        headerShadow: '0 3px 5px 0px rgba(0, 0, 0, 0.05)',
        buttonShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
        componentShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.05)',
      },
      colors: {
        darkNavy: '#0F2552',
        darkGray: '#4B4B4B',
        darkGreen: '#3F6262',
        outlineGray: '#D9D9D9',
        'gray-scale-1': '#F7F7F7',
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '[type="search"]::-webkit-search-decoration': { display: 'none' },
        '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-decoration': {
          display: 'none',
        },
      });
    }),
  ],
};
