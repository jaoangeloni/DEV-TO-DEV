const body = document.getElementsByTagName('body');

fetch('http://localhost:3000/images')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        data.forEach(e => {
            const imagem = document.createElement('img');
            imagem.src = e.url;

            document.body.appendChild(imagem);

        });
    })