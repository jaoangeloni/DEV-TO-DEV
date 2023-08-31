const carrossel = document.getElementById("carrossel");


const images = [
    "../pages/assets/backgrounds/indie1.jpg",
    "../pages/assets/backgrounds/indie2.jpg",
    "../pages/assets/backgrounds/indie4.jpg",
    "../pages/assets/backgrounds/indie6.png",
    "https://www.pcgamesn.com/wp-content/uploads/2022/01/best-indie-games-deaths-door-one.jpg",
];

const aleatorio = Math.floor(Math.random() * images.length);
carrossel.style.backgroundImage = `url('${images[aleatorio]}')`;
setInterval(() => {
}, 0);

