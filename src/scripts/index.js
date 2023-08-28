const carrossel = document.getElementById("carrossel");

const images = [

]

function imagem() {
    const novaImagemUrl = "https://androidknowledge.com/wp-content/uploads/2022/10/loginpg-1024x576.png";
    carrossel.style.backgroundImage = `url(${novaImagemUrl})`;
}