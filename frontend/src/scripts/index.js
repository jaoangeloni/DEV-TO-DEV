
//Gerador de imagens aleatórias quando abre o programa
const carrossel = document.getElementById("carrossel");
const images = [
    // "../pages/assets/backgrounds/indie1.jpg",
    "../pages/assets/backgrounds/indie2.jpg",
    "../pages/assets/backgrounds/indie3.png",
    "../pages/assets/backgrounds/indie4.jpg",
    "../pages/assets/backgrounds/indie5.webp",
    "../pages/assets/backgrounds/indie6.png",
    "https://www.pcgamesn.com/wp-content/uploads/2022/01/best-indie-games-deaths-door-one.jpg",
];

const aleatorio = Math.floor(Math.random() * images.length);
carrossel.style.backgroundImage = `url('${images[aleatorio]}')`;
setInterval(() => {
}, 0);

//Abrir modal de login e de registro de usuário
const modalRegistrar = document.getElementById("registrar");
const modalLogar = document.getElementById("logar");

function goToCreate() {
    modalLogar.classList.toggle("flex")
    modalLogar.classList.toggle("hidden")
    modalRegistrar.classList.toggle("hidden")
    modalRegistrar.classList.toggle("flex")
}

function backToLogin() {
    modalRegistrar.classList.toggle("flex")
    modalRegistrar.classList.toggle("hidden")
    modalLogar.classList.toggle("hidden")
    modalLogar.classList.toggle("flex")
}