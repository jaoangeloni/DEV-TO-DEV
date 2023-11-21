const userData = JSON.parse(localStorage.getItem("user"));

//LOAD POSTS ------------------------------------------------------------------------
function loadPosts() {
    const commentSection = document.getElementById(' commentSection')
    const localPosts = document.getElementById("localPosts")
    const userPageName = document.title;
    const usericon = document.getElementById('usericon')
    usericon.src = userData.profilePicture



    api.get('/user/listar/' + userPageName)
        .then(resp => {

            const data = resp.data[0]

            const banner = document.getElementById('banner');
            banner.style.backgroundImage = `url(${data.profileBanner})`

            const usericon = document.getElementById('usericon')
            usericon.style.backgroundImage = `url(${data.profilePicture})`

            const userGiantIcon = document.getElementById('userGiantIcon');
            userGiantIcon.style.backgroundImage = `url(${data.profilePicture})`
            console.log(data.profilePicture)
            const porfileName = document.getElementById('profileName');
            porfileName.innerHTML = `${data.name}`

            const profileUserName = document.getElementById('profileUserName');
            profileUserName.innerHTML = `#${data.username}`

            const alterarPfp = document.getElementById('alterarPfp')
            alterarPfp.style.backgroundImage = `url(${data.profilePicture})`;

            const alterarBanner = document.getElementById('alterarBanner')
            alterarBanner.style.backgroundImage = `url(${data.profileBanner})`;

            const alterarUsername = document.getElementById('alterarUsername')
            alterarUsername.value = data.username

            const inputAlterarBanner = document.getElementById('inputAlterarBanner');
            const inputAlterarPfp = document.getElementById('inputAlterarPfp');

            inputAlterarBanner.onchange = evt => {
                const [file] = inputAlterarBanner.files
                if (file) {
                    alterarBanner.style.backgroundImage = `url(${URL.createObjectURL(file)})`
                }
            }

            inputAlterarPfp.onchange = evt => {
                const [file] = inputAlterarPfp.files
                if (file) {
                    alterarPfp.style.backgroundImage = `url(${URL.createObjectURL(file)})`
                }
            }
        })

    api.get('/post/listar/' + userPageName)
        .then(resp => {

            const dados = resp.data;
            if (dados.length == 0) {
                const localPosts = document.getElementById('localPosts');
                localPosts.innerHTML = `
                <div class="w-full h-52 bg-land-0 flex items-center justify-center rounded-sm">
                    <p class="text-white">Você não possui publicações</p>
                </div>`
            } else {

                dados.forEach(e => {
                    if (userPageName != userData.username) {
                        const createPost = document.getElementById('createPost');
                        createPost.style.display = 'none'
                        const config = document.getElementById('configIcon')
                        config.style.display = 'none'
                    }


                    const imageData = e.postImage


                    //card post
                    const post = document.createElement('div');
                    post.className = 'w-full rounded-md';

                    //header
                    const postHeader = document.createElement('div');
                    postHeader.className = 'bg-land-0 w-full h-auto p-4 flex flex-col items-start justify-start gap-4 rounded-t-md';

                    const generic = document.createElement('div');
                    generic.className = 'w-full flex gap-2 justify-between items-center relative';

                    //menu para modificar posts
                    const modalSettings = document.createElement('div');
                    modalSettings.className = 'bg-lightpurple-0 w-36 h-20 absolute top-12 right-0 rounded-lg hidden flex-col items-start justify-between p-2';
                    modalSettings.id = 'modalSettings'


                    const alterarIcon = document.createElement('img');
                    alterarIcon.className = 'w-6 h-6';
                    alterarIcon.src = './assets/edit.png';

                    const alterarTitle = document.createElement('p');
                    alterarTitle.className = 'text-white'
                    alterarTitle.innerHTML = 'Alterar post';

                    const excluirPost = document.createElement('div');
                    excluirPost.className = 'flex gap-4 cursor-pointer';
                    excluirPost.onclick = () => {
                        api.delete('/post/deletar/' + e.id)
                            .then(resp => {
                                alert('Post deletado');
                                window.location.reload();
                            })
                    };

                    const excluirIcon = document.createElement('img');
                    excluirIcon.className = 'w-6 h-6';
                    excluirIcon.src = './assets/delete.png';

                    const excluirTitle = document.createElement('p');
                    excluirTitle.className = 'text-white'
                    excluirTitle.innerHTML = 'Excluir post';

                    const settingsMenu = document.createElement('img');
                    settingsMenu.className = 'w-5 h-5 cursor-pointer invert';
                    settingsMenu.src = './assets/menu.png';
                    settingsMenu.onclick = () => {

                        modalSettings.classList.toggle('flex');
                        modalSettings.classList.toggle('hidden');

                    };

                    const generic_child = document.createElement('div');
                    generic_child.className = 'flex gap-2';

                    //foto de perfil do user
                    const userPfp = document.createElement('div');
                    userPfp.className = 'w-16 h-16 rounded-full cursor-pointer bg-center bg-cover bg-no-repeat';
                    userPfp.onclick = () => {
                        window.location = `../profiles/${e.username}.html`
                    }
                    userPfp.style.backgroundImage = `url(${e.profilePicture})`


                    const generic_child_child = document.createElement('div');
                    generic_child_child.className = 'font-osvaldo font-thin flex flex-col items-start justify-center';

                    //nome
                    const name = document.createElement('p');
                    name.className = 'font-light text-2xl text-white';
                    name.innerHTML = e.name

                    //username
                    const username = document.createElement('p');
                    username.className = 'font-extralight text-lg text-white';
                    username.innerHTML = `#${e.username}`;

                    //descricao da imagem
                    const descImage = document.createElement('p');
                    descImage.className = 'font-osvaldo font-light text-lg text-white';
                    descImage.innerHTML = e.descImage;

                    const alterarPost = document.createElement('div');

                    alterarPost.className = 'flex gap-4 cursor-pointer';

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
                    postFooter.className = 'w-full items-start justify-start p-2 flex gap-4 bg-land-0 rounded-b-md';

                    const footer_child1 = document.createElement('div');
                    footer_child1.className = 'bg-lightpurple-0 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';

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

                    const likeCount = document.createElement('p');
                    likeCount.className = 'text-white'
                    likeCount.innerHTML = e.likes;

                    const footer_child2 = document.createElement('div');
                    footer_child2.className = 'bg-lightpurple-0 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100';


                    footer_child2.onclick = () => {

                        api.get('/comentario/listarPost/' + e.id)
                            .then(resp => {
                                const dados = resp.data;

                                dados.forEach(i => {
                                    const divToRemove = document.createElement('div');
                                    divToRemove.className = ''
                                    divToRemove.id = 'divToRemove'

                                    const modeloComment = document.createElement('div');
                                    modeloComment.className = 'flex items-start gap-2 bg-lightpurple-0 p-2 text-white';

                                    const imageFather = document.createElement('div');
                                    imageFather.className = 'flex items-start justify-start gap-2';

                                    const imageSon = document.createElement('div');
                                    imageSon.className = 'w-12 h-12 bg-lightpurple-0 rounded-full bg-cover';

                                    imageSon.style.backgroundImage = `url(${i.profilePicture})`

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

                                    divToRemove.appendChild(modeloComment)
                                    commentSection.appendChild(divToRemove)
                                })
                            })

                        hiddeModalComentarios();

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
                    }

                    const commentIcon = document.createElement('img');
                    commentIcon.className = 'w-6 h-6';
                    commentIcon.src = './assets/comment.png'

                    const commentCount = document.createElement('p');
                    commentCount.className = 'text-white';
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

                        postImage.src = imageData

                        postImage.onclick = () => {
                            const modalImage = document.getElementById('modalImage');
                            modalImage.classList.remove('hidden')
                            modalImage.classList.add('flex')
                            const fullscreen = document.getElementById('bigImage');
                            fullscreen.style.backgroundImage = `url(${imageData})`
                        };

                        //apendando o header e o footer no post
                        post.appendChild(postHeader);
                        post.appendChild(postImage);
                        post.appendChild(postFooter);
                        localPosts.appendChild(post);

                    }

                });
            }
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

function hiddeModalComentarios() {
    // const divToRemove = document.getElementById('divToRemove')
    // divToRemove.parentNode.removeChild(divToRemove);

    const modalComentarios = document.getElementById('modalComentarios');
    modalComentarios.classList.toggle('flex');
    modalComentarios.classList.toggle('hidden');
}

function formGamePage() {
    const modalForm = document.getElementById('modalForm');
    modalForm.classList.toggle('flex');
    modalForm.classList.toggle('hidden');
}

function goToProfile() {
    window.location = `../profiles/${userData.username}.html`
}

function goToHome() {
    window.location = '../feed/feed.html'
}

function logoff() {
    localStorage.removeItem("user");
    window.location = "../login/index.html"
}

function hiddeModalConfig() {
    const modalConfig = document.getElementById('modalConfig');
    modalConfig.classList.toggle('flex')
    modalConfig.classList.toggle('hidden')
}

const updateUser = document.getElementById('updateUser');
updateUser.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputAlterarBanner = document.querySelector('#inputAlterarBanner');
    const inputAlterarPfp = document.querySelector('#inputAlterarPfp');
    const alterarUsername = document.querySelector('#alterarUsername');
    const imagemBanner = inputAlterarBanner.files[0];
    const imagemPfp = inputAlterarPfp.files[0];

    const formData = new FormData();
    formData.append('id', userData.id);
    formData.append('name', alterarUsername.value);
    formData.append('profilePicture', imagemPfp);
    formData.append('profileBanner', imagemBanner);

    api.post('/user/alterar', formData)
        .then(resp => {
            try {
                if (resp.status == 200) {
                    window.location.reload();
                } else {
                    console.error('Erro ao atualizar perfil: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao atualizar perfil: ' + error.message);
            }
        });


});

criarGamePage = document.getElementById('criarGamePage')
criarGamePage.addEventListener('submit', async (e) => {
    e.preventDefault();

    const gamePageName = document.getElementById('gamePageName');
    const gamePageGenre = document.getElementById('gamePageGenre');
    const gameDescription = document.getElementById('gameDescription');
    const gamePageBanner = document.getElementById('gamePageBanner');
    const gamePageImage = document.getElementById('gamePageImage');

    const imagemBanner = gamePageBanner.files[0];
    const imagemPfp = gamePageImage.files[0];

    const formData = new FormData();
    formData.append('userId', userData.id);
    formData.append('name', gamePageName.value);
    formData.append('gameDescription', gameDescription.value);
    formData.append('gameGenreId', gameGenre.value);
    formData.append('gamePicture', imagemBanner);
    formData.append('gameImage', imagemPfp);

    api.post('/gamepage/criar', formData)
        .then(resp => {
            try {
                if (resp.status == 200) {
                    window.location.reload();
                } else {
                    console.error('Erro ao criar página: ' + resp.statusText);
                }
            } catch (error) {
                console.error('Erro ao criar página: ' + error.message);
            }
        });
})