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
                            try {
                                const responseData = resp.data
                                const imagem = document.querySelector('#imageTeste');
                                const descricao = document.querySelector('#descricao');

                                const imageBuffer = new Uint8Array(responseData[0].postImage.data);

                                const imageBlob = new Blob([imageBuffer], { type: responseData[0].mime_type });

                                const imageUrl = URL.createObjectURL(imageBlob);

                                imagem.src = imageUrl;
                                descricao.innerHTML = responseData[0].descImage

                            } catch (error) {
                                console.log(error)
                            }
                        });

                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});
