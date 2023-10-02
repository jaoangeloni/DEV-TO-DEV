const localPostGames = document.getElementById("localPostGames");

function loadGames() {
    api.get('/gamepage/listar')

        .then(resp => {
            const dados = resp.data

            dados.forEach(e => {
                const imageData = e.postImage

                const postgames = document.createElement('div')
                post.classname = ('w-full h-56 bg-gray-200 hover:scale-105 hover:cursor-pointer duration-200 flex')

                const imagepost = document.createElement('img')
                post.classname = ('w-36 h-32 hover:rounded-full duration-200 cursor-pointer')

                const divvazia = document.createElement('div')
                post.classname = ('')
            });
        })
}