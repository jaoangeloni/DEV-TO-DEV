/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/index.html"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Tulpen One', 'sans'],
        dev: ['Passero One', 'cursive'],
        normal: ['Oswald', 'sans-serif']
      },
      dropShadow: {
        'sombrinha': [
          '-1px 1px 0 #fc03df',
          '-2px 2px 0 #fc03df',
        ]
      }
    },
    plugins: [],
  }
}

