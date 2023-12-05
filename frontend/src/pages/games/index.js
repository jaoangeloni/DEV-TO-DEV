const localPostGames = document.getElementById("localPostGames");

function loadGames() {
    fetch('/gamepage/listar')
      .then(response => response.json())
      .then(data => {
        const postMain = document.getElementById('postMain');
        postMain.innerHTML = '';

        data.forEach(game => {
          const gameCard = document.createElement('div');
          gameCard.className = 'flex bg-land-0 w-full h-40 rounded p-2 gap-10 hover:cursor-pointer';

          gameCard.innerHTML = `
            <div class="w-80 gap-12 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            <div class="w-full flex flex-col">
              <p class="text-white font-osvaldo text-2xl">${game.name}</p>
              <p class="text-white font-osvaldo mt-4">${game.gameDescription}</p>
              <p class="text-white text-end font-osvaldo gap-10 mt-4">${game.genreName}</p>
            </div>
          `;

          postMain.appendChild(gameCard);
        });
      })
  }

  window.onload = loadGames;
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