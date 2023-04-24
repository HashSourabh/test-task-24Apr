/** @type {import("tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#D1C4E9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
