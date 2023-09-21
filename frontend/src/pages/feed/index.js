const likeImage = document.getElementById("likeIcon");
const localPosts = document.getElementById("localPosts")

//LOAD POSTS ------------------------------------------------------------------------
function loadPosts() {
    api.get('/post/listar')
        .then(resp => {
            const dados = resp.data;

            dados.forEach(e => {
                const imageData = e.postImage

                //card post
                const post = document.createElement('div');
                post.className = 'w-full rounded-md';

                //header
                const postHeader = document.createElement('div');
                postHeader.className = 'bg-gray-200 w-full h-auto p-4 flex flex-col items-start justify-start gap-4 rounded-t-md';

                const generic = document.createElement('div');
                generic.className = 'flex gap-2';

                const generic_child = document.createElement('div');
                generic_child.className = 'font-osvaldo font-thin flex flex-col items-start justify-center';

                //foto de perfil do user
                const userPfp = document.createElement('img');
                userPfp.className = 'w-16 rounded-full';
                if (!e.userPfp) {
                    userPfp.src = './assets/default.png';
                }

                //nome
                const name = document.createElement('p');
                name.className = 'font-light text-2xl';
                name.innerHTML = e.name

                //username
                const username = document.createElement('p');
                username.className = 'font-extralight text-lg';
                username.innerHTML = `#${e.username}`;

                //descricao da imagem
                const descImage = document.createElement('p');
                descImage.className = 'font-osvaldo font-light text-lg';
                descImage.innerHTML = e.descImage;

                //apendando os bagulho do header
                generic_child.appendChild(name)
                generic_child.appendChild(username)
                generic.appendChild(userPfp)
                generic.appendChild(generic_child)
                postHeader.appendChild(generic)
                postHeader.appendChild(descImage)

                //footer com elementos de curtida e comentário
                const postFooter = document.createElement('div');
                postFooter.className = 'w-full items-start justify-start p-2 flex gap-4 bg-gray-200 rounded-b-md';

                const footer_child1 = document.createElement('div');
                footer_child1.className = 'bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';

                //like
                const likeIcon = document.createElement('img');
                likeIcon.className = 'w-6 h-6';
                likeIcon.src = './assets/like.png'

                const likeCount = document.createElement('div');
                likeCount.innerHTML = '100';

                const footer_child2 = document.createElement('div');
                footer_child2.className = 'bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';

                const commentIcon = document.createElement('img');
                commentIcon.className = 'w-6 h-6';
                commentIcon.src = './assets/comment.png'

                const commentCount = document.createElement('div');
                commentCount.innerHTML = '100';

                //apendando os bagulho do footer
                footer_child1.appendChild(likeIcon);
                footer_child1.appendChild(likeCount);
                footer_child2.appendChild(commentIcon);
                footer_child2.appendChild(commentCount);
                postFooter.appendChild(footer_child1);
                postFooter.appendChild(footer_child2);


                //apendando o header e o footer no post
                if (!imageData) {
                    post.appendChild(postHeader);
                    post.appendChild(postFooter);
                    localPosts.appendChild(post);
                } else {
                    //imagem do post
                    const postImage = document.createElement('img');
                    postImage.className = 'w-full h-auto bg-cover cursor-zoom-in';

                    const imageBuffer = new Uint8Array(imageData.data);

                    const imageBlob = new Blob([imageBuffer], { type: e.mime_type });

                    const imageUrl = URL.createObjectURL(imageBlob);

                    postImage.src = imageUrl

                    postImage.onclick = () => {
                        console.log('a')
                        const modalImage = document.getElementById('modalImage');

                        modalImage.classList.remove('hidden')
                        modalImage.classList.add('flex')
                        const fullscreen = document.getElementById('bigImage');
                        fullscreen.style.backgroundImage = `url(${imageUrl})`
                    };


                    //apendando o header e o footer no post
                    post.appendChild(postHeader);
                    post.appendChild(postImage);
                    post.appendChild(postFooter);
                    localPosts.appendChild(post);


                }

            });
        })
}


//PUBLICAR POSTS--------------------------------------------------------------------------
const toPost = document.getElementById('uploadForm');

toPost.addEventListener('submit', async (e) => {
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
            try {
                if (resp.status == 200) {
                    window.location.reload();
                } else {
                    console.error('Erro ao enviar imagem: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao enviar imagem: ' + error.message);
            }
        });

});

//ABRIR MODAL DE IMAGEM---------------------------------------------------
function hiddeModal() {
    const modalImage = document.getElementById('modalImage');

    modalImage.classList.remove('flex')
    modalImage.classList.add('hidden')
}