const images = [
    "https://www.nme.com/wp-content/uploads/2020/11/Haven-Credit-The-Game-Bakers-HERO@2000x1270.jpg",
    "https://prod-upp-image-read.ft.com/4fd6fa10-a714-11e9-90e9-fc4b9d9528b4",
    "https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2015/08/31/1331744414923_2/indie-games",
    "https://media.npr.org/assets/img/2020/12/24/hld_wide-3315e1e152e2b275d8c494825fa15ec3025edb08.jpg",
    "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2019/05/01/58381390-4957-4436-a623-ad4995168215/proximos-jogos-indie-capa-inmost"
];

const imagem = document.querySelector("#imagem");

setInterval(() => {
    let aleatorio = Math.floor(Math.random() * images.length);
    imagem.src = images[aleatorio];
}, 1000);
