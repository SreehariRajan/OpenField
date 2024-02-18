/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: ["light"],
  },

  plugins: [require("daisyui")
    ,
  function ({ addUtilities }) {
    const newUtilities = {
      '.no-scrollbar::-webkit-scrollbar': {
        display: "none",
      },
      ".no-scrollbar": {
        "-ms-overflow-style": "none",

        "scrollbar-width": "none",
      }
    }
    addUtilities(newUtilities)
  }],
};
