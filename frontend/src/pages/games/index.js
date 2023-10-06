const localPostGames = document.getElementById("localPostGames");

function loadGames() {
    api.get('/gamepage/listar')

        .then(resp => {
            const dados = resp.data

            dados.forEach(e => {
                const card = document.createElement('div');
                card.className = 'w-full h-56 bg-gray-200 hover:scale-105 hover:cursor-pointer duration-200 flex';

                const gameImg = document.createElement('div');
                gameImg.className = 'w-36 h-32 hover:rounded-full duration-200 cursor-pointer';

                const card = document.createElement('div');
                card.className = '';
                const card = document.createElement('div');
                card.className = '';
            });
        })
}