// const localPostGames = document.getElementById("localPostGames");

// function loadGames() {
//     api.get('/gamepage/listar')

//         .then(resp => {
//             const dados = resp.data

//             dados.forEach(e => {
//                 const card = document.createElement('div');
//                 card.className = 'w-full h-56 bg-gray-200 hover:scale-105 hover:cursor-pointer duration-200 flex';

//                 const gameImg = document.createElement('div');
//                 gameImg.className = 'w-36 h-32 hover:rounded-full duration-200 cursor-pointer';

//                 const card = document.createElement('div');
//                 card.className = '';
//                 const card = document.createElement('div');
//                 card.className = '';
//             });
//         })
// }
let userData = JSON.parse(localStorage.getItem("user"));

api.get('/user/listar/' + userData.username)
.then(resp => {
    const data = resp.data[0]
    const usericon = document.getElementById('usericon')
    usericon.style.backgroundImage = `url(${data.profilePicture})`
})

api.get('/user/listar/' + userData.username)
.then(resp => {
    const data = resp.data[0]
    const usericon = document.getElementById('usericon')
    usericon.style.backgroundImage = `url(${data.profilePicture})`
})

api.get('user/listar')
.then(resp => {
    const data = resp.data

    data.forEach(e => {
        console.log(e)
        const navLeft = document.getElementById('navLeft');

        const profileCard = document.createElement('div');
        profileCard.className = 'w-full bg-land-0 h-24 rounded-md flex items-center justify-start p-2 space-x-5 hover:bg-lightpurple-0 hover:cursor-pointer hover:bg-gray-500';
        
        const userCard = `
        <div class="bg-gray-300 w-16 h-16 rounded-full bg-cover bg-center"
        style="background-image: url(${e.profilePicture});"></div>
        <p class="font-osvaldo text-2xl text-white font-extralight">${e.name}</p>
        `

        profileCard.innerHTML = userCard;

        profileCard.onclick = () => {
            window.location = `../profiles/${e.username}.html`;
        }

        navLeft.appendChild(profileCard);

        });
    })

function goToFeed() {
    window.location = `../feed/feed.html`
}

function goToProfile() {
    window.location = `../profiles/${userData.username}.html`
}

function logoff() {
    localStorage.removeItem("");

    window.location = "../login/index.html"
}