/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '375px',
      },
      minWidth: {
        'pcScreen': '500px',
      },
      screens: {
        'responsive': '100vw',
      },
      backgroundColor: {
        'intro': 'lightgrey',
      },
      fontFamily: {
        'title': ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
  ],
}
