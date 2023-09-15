document.addEventListener('DOMContentLoaded', () => {
    const imageForm = document.getElementById('imageForm');
    const imageInput = document.getElementById('imageInput');
    const messageDiv = document.getElementById('message');

    imageForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', imageInput.files[0]);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.text();
                messageDiv.innerHTML = `<p>${data}</p>`;
            } else {
                const error = await response.text();
                messageDiv.innerHTML = `<p>Erro: ${error}</p>`;
            }
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            messageDiv.innerHTML = `<p>Erro ao enviar imagem.</p>`;
        }
    });
});