/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,js}", "../../templates/**/*.html"],
  theme: {
    extend: {
        colors: {
            'lime': {
                30: '#fafef0',
            }
        }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require("daisyui")
  ],

  daisyui: {
      themes: false,
  }
}
