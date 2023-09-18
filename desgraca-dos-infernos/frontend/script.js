
api.get('/imagem/4')
    .then(resp => {
        console.log(resp)
    })
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.querySelector('#userId').value;
    const descImage = document.querySelector('#descImage').value;
    const imagemInput = document.querySelector('#imagem');
    const imagem = imagemInput.files[0];

    let post = {
        "userId": userId,
        "descImage": descImage,
        "postImage": imagem
    }

    api.post('/upload', post)
        .then(resp => {

            if (response.ok) {
                console.log('Imagem enviada com sucesso.');
                // Redirecione ou faça alguma ação após o envio bem-sucedido.
            } else {
                console.error('Erro ao enviar imagem: ' + response.statusText);
            }

        });

});