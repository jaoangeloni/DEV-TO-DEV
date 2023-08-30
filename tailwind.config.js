/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/index.html"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Tulpen One', 'sans'],
        dev: ['Passero One', 'cursive'],
        osvaldo: ['Oswald', 'sans-serif']
      },
      dropShadow: {
        'sombrinha': [
          '-1px 1px 0 #fc03df',
          '-2px 2px 0 #fc03df',
        ],
        'sombrinhabaixo': [
          '0px 1px 0 #fc03df',
          '0px 2px 0 #fc03df',
          '0px 2.5px 0 #fc03df',
        ]
      }
    },
    plugins: [],
  }
}



