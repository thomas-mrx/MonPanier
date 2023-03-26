/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,js}", "../../templates/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/typography'),
      require("daisyui")
  ],
}
