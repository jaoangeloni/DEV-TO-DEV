const likeImage = document.getElementById("likeIcon");
const localPosts = document.getElementById("localPosts")
const commentSection = document.getElementById('commentSection')
let userData = JSON.parse(localStorage.getItem("user"));

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
                generic.className = 'w-full flex gap-2 justify-between items-center relative';

                //menu para modificar posts
                const modalSettings = document.createElement('div');
                modalSettings.className = 'bg-white w-36 h-20 absolute top-12 right-0 rounded-lg hidden flex-col items-start justify-between p-2';
                modalSettings.id = 'modalSettings'


                const alterarIcon = document.createElement('img');
                alterarIcon.className = 'w-6 h-6';
                alterarIcon.src = './assets/edit.webp';

                const alterarTitle = document.createElement('p');
                alterarTitle.innerHTML = 'Alterar post';

                const excluirPost = document.createElement('div');
                excluirPost.className = 'flex gap-4 hover:bg-gray-100 cursor-pointer';
                excluirPost.onclick = () => {
                    api.delete('/post/deletar/' + e.id)
                        .then(resp => {
                            alert('Post deletado');
                            window.location.reload();
                        })
                };

                const excluirIcon = document.createElement('img');
                excluirIcon.className = 'w-6 h-6';
                excluirIcon.src = './assets/delete.webp';

                const excluirTitle = document.createElement('p');
                excluirTitle.innerHTML = 'Excluir post';

                const settingsMenu = document.createElement('img');
                settingsMenu.className = 'w-5 h-5 cursor-pointer';
                settingsMenu.src = './assets/menu.png';
                settingsMenu.onclick = () => {

                    modalSettings.classList.toggle('flex');
                    modalSettings.classList.toggle('hidden');

                };

                const generic_child = document.createElement('div');
                generic_child.className = 'flex gap-2';

                //foto de perfil do user
                const userPfp = document.createElement('img');
                userPfp.className = 'w-16 rounded-full bg-gray-50';
                if (!e.userPfp) {
                    userPfp.src = './assets/default.png';
                }

                const generic_child_child = document.createElement('div');
                generic_child_child.className = 'font-osvaldo font-thin flex flex-col items-start justify-center';

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

                const alterarPost = document.createElement('div');

                alterarPost.className = 'flex gap-4 hover:bg-gray-100 cursor-pointer';

                alterarPost.onclick = () => {
                    const modalAlterar = document.getElementById('modalAlterar');
                    modalAlterar.classList.toggle('flex')
                    modalAlterar.classList.toggle('hidden')

                    const cancelarAlteracao = document.getElementById('cancelarAlteracao')
                    cancelarAlteracao.onclick = () => {
                        modalAlterar.classList.toggle('flex')
                        modalAlterar.classList.toggle('hidden')
                    }


                    const descAlterada = document.getElementById('descAlterada');
                    descAlterada.value = e.descImage

                    const alterarDesc = document.getElementById('alterarDesc');
                    alterarDesc.onclick = () => {
                        const newDesc = {
                            id: e.id,
                            descImage: descAlterada.value
                        }

                        if (!e.postImage) {
                            if (descAlterada.value == 0) {
                                alert('Coloque ao menos um caractére');
                            } else if (descAlterada.value == e.descImage) {
                                alert('A descrição é a mesma');
                            } else {
                                api.put('/post/alterar', newDesc)
                                    .then(resp => {
                                        window.location.reload()
                                    });
                            }
                        } else {
                            api.put('/post/alterar', newDesc)
                                .then(resp => {
                                    window.location.reload()
                                });
                        }
                    }
                }

                //apendando os bagulho do header
                alterarPost.appendChild(alterarIcon);
                alterarPost.appendChild(alterarTitle);

                excluirPost.appendChild(excluirIcon);
                excluirPost.appendChild(excluirTitle);

                modalSettings.appendChild(alterarPost)
                modalSettings.appendChild(excluirPost)

                generic_child_child.appendChild(name)
                generic_child_child.appendChild(username)

                generic_child.appendChild(userPfp)
                generic_child.appendChild(generic_child_child)

                generic.appendChild(modalSettings)
                generic.appendChild(generic_child)

                if (e.userId == userData.id) {
                    generic.appendChild(settingsMenu)
                }

                postHeader.appendChild(generic)
                postHeader.appendChild(descImage)

                //footer com elementos de curtida e comentário
                const postFooter = document.createElement('div');
                postFooter.className = 'w-full items-start justify-start p-2 flex gap-4 bg-gray-200 rounded-b-md';

                const footer_child1 = document.createElement('div');
                footer_child1.className = 'bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';

                const likeIcon = document.createElement('img');
                likeIcon.className = 'w-6 h-6';

                api.get(`/likes/listar/${e.id}/${userData.id}`)
                    .then(resp => {
                        if (resp.data.length > 0)
                            likeIcon.src = './assets/liked.png';
                        else
                            likeIcon.src = './assets/like.png';
                    })

                footer_child1.onclick = () => {
                    const curtida = {
                        userId: userData.id,
                        postId: e.id
                    }

                    api.get(`/likes/listar/${e.id}/${userData.id}`)
                        .then(resp => {
                            if (resp.data.length > 0) {
                                const id = resp.data[0].id
                                api.delete('/likes/deletar/' + id)
                                    .then(() => {
                                        alert('Descurtido');
                                        window.location.reload();
                                    })
                            } else {
                                api.post('/likes/curtir', curtida)
                                    .then(() => {
                                        alert('Curtido')
                                        window.location.reload();
                                    })
                            }
                        })
                }

                //like

                const likeCount = document.createElement('div');
                likeCount.innerHTML = e.likes;

                const footer_child2 = document.createElement('div');
                footer_child2.className = 'bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';


                footer_child2.onclick = () => {
                    hiddeModalComentarios();
                }

                api.get('/comentario/listarPost/' + e.id)
                    .then(resp => {
                        const dados = resp.data;

                        dados.forEach(i => {
                            const modeloComment = document.createElement('div');
                            modeloComment.className = 'flex items-start gap-2 bg-gray-50 p-2 r';

                            const imageFather = document.createElement('div');
                            imageFather.className = 'flex items-start justify-start gap-2';

                            const imageSon = document.createElement('div');
                            imageSon.className = 'w-12 h-12 bg-gray-100 rounded-full bg-cover';
                            if (!i.profilePicture) {
                                imageSon.style.backgroundImage = 'url(./assets/default.png)'
                            }

                            const textContent = document.createElement('div');
                            textContent.className = 'flex flex-col items-start justify-start';

                            const userName = document.createElement('div');
                            userName.className = 'font-osvaldo font-light text-lg';
                            userName.innerHTML = i.username

                            const description = document.createElement('div');
                            description.className = 'font-osvaldo font-thin text-lg';
                            description.innerHTML = i.commentDescription

                            textContent.appendChild(userName)
                            textContent.appendChild(description)

                            imageFather.appendChild(imageSon)

                            modeloComment.appendChild(imageFather)
                            modeloComment.appendChild(textContent)

                            commentSection.appendChild(modeloComment)
                        })
                    })

                const publicarComentario = document.getElementById('publicarComentario');
                const commentDescription = document.getElementById('commentDescription');


                publicarComentario.onclick = () => {
                    const comentario = {
                        userId: userData.id,
                        postId: e.id,
                        commentDescription: commentDescription.value
                    }

                    api.post('/comentario/criar', comentario)
                        .then(resp => {
                            alert('Comentário publicado');
                            window.location.reload()
                        })
                }


                const commentIcon = document.createElement('img');
                commentIcon.className = 'w-6 h-6';
                commentIcon.src = './assets/comment.png'

                const commentCount = document.createElement('div');
                commentCount.innerHTML = e.comments;

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
                    postImage.className = 'w-full h-auto cursor-zoom-in'

                    const imageBuffer = new Uint8Array(imageData.data);

                    const imageBlob = new Blob([imageBuffer], { type: e.mime_type });

                    const imageUrl = URL.createObjectURL(imageBlob);

                    postImage.src = imageUrl

                    postImage.onclick = () => {
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

    const descImage = document.querySelector('#descImage');
    const imagemInput = document.querySelector('#imagem');
    const imagem = imagemInput.files[0];

    const formData = new FormData();
    formData.append('userId', userData.id);
    formData.append('descImage', descImage.value);
    formData.append('postImage', imagem);

    if (descImage.value == 0 && imagem == null) {
        alert('Adicione uma descrição ou uma imagem para poder fazer uma publicação')

    } else {
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
    }

});

//ABRIR MODAL DE IMAGEM---------------------------------------------------
function hiddeModal() {
    const modalImage = document.getElementById('modalImage');
    modalImage.classList.toggle('flex')
    modalImage.classList.toggle('hidden')
}

function openSettings() {
    const modalSettings = document.getElementById('modalSettings');
    modalSettings.classList.toggle('flex');
    modalSettings.classList.toggle('hidden');
}

// //CURTIDAS ---------------------------------------------------
// let isLiked = false;
// let count = 0;

// //Verifica se tem um valor no LocalStorage para o contador
// const storedLikes = localStorage.getItem("likes");
// if (storedLikes) {
//     count = parseInt(storedLikes, 10);
//     updateLikeCount();
// }

// function like() {
//     const likeIcon = document.getElementById("likeIcon");

//     if (isLiked) {
//         likeIcon.src = "./assets/liked.png";
//         if (count > 0);
//         count--;
//     } else {
//         likeIcon.src = "./assets/like.png";
//         count++;
//     }
//     isLiked = !isLiked;
//     updateLikeCount();

//     //Atualiza o contador no LocalStorage
//     localStorage.setItem("likes", count.toString());

//     //Animaçãozinha  de like :3 
//     likeIcon.classList.remove("animate-pulse");
//     setTimeout(() => {
//         likeIcon.classList.add("animate-pulse");
//     }, 0);

// }

// function updateLikeCount() {
//     const likeCount = document.getElementById("likeCount");
//     likeCount.textContent = `${count}`;
// }

// function perfil() {
//     api.post("/user/login", data)
//         .then(resp => {
//             if (resp.status == 200) {
//                 localStorage.setItem("user", JSON.stringify(resp.data));
//                 window.location.href = "../perfil/perfil.html";

//                 ipc.send('maximizeRestoreApp')
//             } else if (resp.status == 206) {
//                 let string = resp.data.error;
//                 showModal(string, 0);
//             }
//         })

// }



function hiddeModalComentarios() {
    const modalComentarios = document.getElementById('modalComentarios');
    modalComentarios.classList.toggle('flex');
    modalComentarios.classList.toggle('hidden');
}