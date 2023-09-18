
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

    const formData = new FormData();
    formData.append('userId', userId.value);
    formData.append('descImage', descImage.value);
    formData.append('postImage', imagem);

    api.post('/upload', formData)
        .then(resp => {
            try {
                if (resp.ok) {
                    console.log('Imagem enviada com sucesso.');
                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});