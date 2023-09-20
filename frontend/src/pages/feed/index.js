const likeImage = document.getElementById("likeIcon");
const localPosts = document.getElementById("localPosts")

function loadPosts() {
    api.get('/post/listar')
        .then(resp => {
            console.log(resp.data)
            const dados = resp.data

            dados.forEach(e => {
                console.log(dados[e])
                // const postImage = dados[i].postImage

                // const mime_type = dados[i].mime_type

                // const post = document.createElement('div');
                // post.className = 'w-full h-96 bg-gray-50'

                // const imageBuffer = new Uint8Array(postImage.data);

                // const imageBlob = new Blob([imageBuffer], { type: dados.mime_type });

                // const imageUrl = URL.createObjectURL(imageBlob);

                // post.style.backgroundImage = `url='${imageUrl}'`;

                // localPosts.appendChild(post)

            });
        })
}