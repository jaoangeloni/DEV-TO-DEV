
//Gerador de imagens aleatórias quando abre o programa
const carrossel = document.getElementById("carrossel");
const imagePath = '../../pages/login/assets/backgrounds/';

const images = [
    imagePath + 'indie2.jpg',
    imagePath + 'indie3.png',
    imagePath + 'indie4.jpg',
    imagePath + 'indie5.webp',
    imagePath + 'indie6.png',
    imagePath + 'indie7.jpg',
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