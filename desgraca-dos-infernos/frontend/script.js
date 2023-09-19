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

    api.post('/post/criar', formData)
        .then(resp => {
            console.log(resp)
            try {
                if (resp.status == 200) {
                    const id = resp.data
                    api.get('/post/listar/' + id)
                        .then(resp => {
                            const responseData = resp.data
                            const imagem = document.querySelector('#imageTeste');

                            // Acesse a imagem no objeto de resposta.
                            const imageBuffer = new Uint8Array(responseData[0].postImage.data);

                            // Crie um Blob a partir dos dados da imagem.
                            const imageBlob = new Blob([imageBuffer], { type: responseData[0].mime_type });

                            // Crie uma URL do Blob.
                            const imageUrl = URL.createObjectURL(imageBlob);

                            // Defina a URL como o atributo src da sua tag <img>.
                            imagem.src = imageUrl;
                        });

                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});
