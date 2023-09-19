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
                    console.log('Imagem enviada com sucesso.');

                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});
api.get('/post/listar/4')
    .then(resp => {
        const imageBuffer = resp.data[0].postImage;
        console.log(imageBuffer)
        const imageBlob = new Blob([imageBuffer]); // Substitua 'image/jpeg' pelo tipo MIME correto da sua imagem
        console.log(imageBlob)
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log(imageUrl)

        const teste = document.getElementById('imageTeste');
        teste.src = imageUrl;
    });