/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/login/*.html", "./src/pages/feed/*.html", "./src/perfil/*.hmtl"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Tulpen One', 'sans'],
        dev: ['Passero One', 'cursive'],
        osvaldo: ['Oswald', 'sans-serif'],
        concert: ['Concert One', 'cursive'],
        fontefoda: ['Amatic SC', 'cursive'],
        fontefod2: ['Amatic SC', 'cursive']
      },
      dropShadow: {
        'sombrinha': [
          '-1px 1px 0 #fc03df',
          '-2px 2px 0 #fc03df',
        ],
        'sombrinhabaixo': [
          '0px 1px 0 rgb(236, 72, 153)',
          '0px 2px 0 rgb(236, 72, 153)',
          '0px 2.5px 0 rgb(236, 72, 153)',
          '0px 3px 0 rgb(236, 72, 153)',
        ],
        'sombra': [
          '0px 5px 5px rgb(0,0,0)'
        ]
      },
      backgroundImage: {
        'bannerfoda': "url('/src/pages/assets/backgrounds/bannerfoda.jpg')"
      }
    },
    plugins: [],
  }
}



