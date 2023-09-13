
const url = 'http://localhost:3000/listar/1'
const carregarImagemDoUsuario = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar a imagem do usuário');
        }

        const urlImage = await response.json();

        // Selecionar a tag img pelo ID
        const imgUsuario = document.getElementById('imagem');

        // Definir o atributo 'src' da imagem com a URL obtida
        imgUsuario.src = urlImage;
    } catch (error) {
        console.error(error);
    }
};
carregarImagemDoUsuario();