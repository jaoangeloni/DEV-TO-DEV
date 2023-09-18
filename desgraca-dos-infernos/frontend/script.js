
api.get('/imagem/4')
    .then(resp => {
        console.log(resp)
    })

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.querySelector('#userId');
    const descImage = document.querySelector('#descImage');
    const imagemInput = document.querySelector('#imagem');
    const imagem = imagemInput.files[0];

    let post = {
        "userId": userId.value,
        "descImage": descImage.value,
        "postImage": imagem
    }

    console.log(post)
    api.post('/upload', post)
        .then(resp => {
            try {
                if (resp.ok) {
                    console.log('Imagem enviada com sucesso.');
                    // Redirecione ou faça alguma ação após o envio bem-sucedido.
                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});