// const remote = require('electron').remote

const carrossel = document.getElementById("carrossel");


const images = [
    "https://www.pcgamesn.com/wp-content/uploads/2022/01/best-indie-games-deaths-door-one.jpg",
];

setInterval(() => {
    const aleatorio = Math.floor(Math.random() * images.length);
    carrossel.style.backgroundImage = `url(${images[0]})`;
}, 0);

