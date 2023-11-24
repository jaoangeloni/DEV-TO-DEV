const fs = require('fs');
const path = require('path');
const con = require('../db/connect');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const storage = multer.memoryStorage();

const criar = (req, res) => {
    let user = new User(req.body)
    con.query(user.create(), (err, result) => {
        if (err == null) {
            const userId = result.userId;
            const username = user.username;


            const baseDir = path.join(__dirname, '../../../frontend/src/pages');
            const perfilDir = path.join(baseDir, 'profiles');
            if (!fs.existsSync(perfilDir)) {
                fs.mkdirSync(perfilDir);
            }

            // Conteúdo HTML para o perfil
            const perfilHTML = `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${username}</title>
                <link rel="stylesheet" href="../../../dist/output.css">
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Passero+One&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet">
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="../../scripts/api.js"></script>
            </head>
            
            <body class="w-full bg-bg-0" onload="loadPosts()">

            <div id="modalForm" class="fixed bg-black w-full h-full bg-opacity-50 hidden items-center justify-center z-20">
        <div id="form"
            class="w-1/2 h-4/5 rounded-sm bg-bg-0 flex items-center justify-evenly z-30 flex-col p-4 relative">
            <p class="text-white font-osvaldo text-2xl font-regular">Nova página de jogo</p>
            <p class="text-white font-osvaldo font-extralight text-lg">(Você poderá alterar os
                valores depois)</p>

            <div id="cancelarAlteracao" onclick="formGamePage()"
                class="bg-red-500 text-white rounded-full w-6 h-6 text-center absolute top-2 right-2 cursor-pointer">
                <img src="./assets/close.png" alt="">
            </div>

            <form action="/user/alterar" method="post" enctype="multipart/form-data"
                class="flex items-start justify-evenly h-full flex-col p-4 w-full" id="criarGamePage">

                <div class="flex w-full items-center justify-between">
                    <label for="gamePageName"
                        class="flex items-center justify-start gap-4 hover:bg-gray-600 w-1/2 flex-col p-2 cursor-pointer rounded-sm">
                        <p class="font-osvaldo text-white font-extralight text-lg">Nome do seu jogo</p>
                        <input type="text" id="gamePageName"
                            class="text-center outline-none text-white bg-lightpurple-0 h-8 w-full">
                    </label>

                    <label for="gamePageGenre"
                        class="flex items-center justify-start gap-4 hover:bg-gray-600 w-1/2 flex-col p-2 cursor-pointer rounded-sm">
                        <p class="font-osvaldo text-white font-extralight text-lg">Gênero</p>
                        <select name="gamePageGenre" id="gamePageGenre"
                            class="text-center outline-none text-white bg-lightpurple-0 h-8 w-full">
                            <option value="FPS">FPS</option>
                            <option value="PVP">PVP</option>
                            <option value="Aventura">Aventura</option>
                            <option value="MOBA">MOBA</option>
                            <option value="RPG">RPG</option>
                            <option value="MMO">MMO</option>
                            <option value="Luta">Luta</option>
                            <option value="Simulação">Simulação</option>
                            <option value="Plataforma">Plataforma</option>
                            <option value="Corrida">Corrida</option>
                            <option value="Terror">Terror</option>
                            <option value="História">História</option>
                        </select>
                    </label>
                </div>

                <label for="gameDescription"
                    class="flex items-center justify-start gap-4 hover:bg-gray-600 w-full flex-col p-2 cursor-pointer rounded-sm">
                    <p class="font-osvaldo text-white font-extralight text-lg">Descrição</p>
                    <input type="text" id="gameDescription"
                        class="text-center outline-none text-white bg-lightpurple-0 h-8 w-full">
                </label>

                <label for="gamePageBanner"
                    class="flex items-center flex-col justify-start gap-4 hover:bg-gray-600 w-full p-2 cursor-pointer rounded-sm">
                    <p class="font-osvaldo text-white font-extralight text-lg">Banner</p>
                    <div id="gameBanner" class="w-full h-48 bg-cover bg-center bg-white"></div>
                    <input id="gamePageBanner" type="file" name="profileBanner"
                        class="text-white font-osvaldo font-light hidden">
                </label>

                <label for="gamePageImage"
                    class="flex items-center justify-start gap-4 hover:bg-gray-600 w-full flex-col p-2 cursor-pointer rounded-sm">
                    <p class="font-osvaldo text-white font-extralight text-lg">Foto</p>
                    <div id="gameImage" class="w-24 h-24 bg-cover bg-center bg-white"></div>
                    <input id="gamePageImage" type="file" name="profilePicture"
                        class="text-white font-osvaldo font-light hidden">
                </label>

                <div class="flex justify-center items-center w-full mt-4">
                    <input type="submit" value="CRIAR PÁGINA"
                        class="bg-yellow-400 p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-yellow-500 w-1/4" />
                </div>
        </div>
    </div>

    <div id="modalConfig" class="fixed bg-black w-full h-full bg-opacity-50 hidden items-center justify-center z-20">
        <div id="configBox"
            class="w-1/2 h-4/5 rounded-sm bg-bg-0 flex items-center justify-evenly z-30 flex-col p-4 relative">

            <p class="text-white font-osvaldo font-extralight text-2xl">Configurar Perfil</p>

            <div id="cancelarAlteracao" onclick="hiddeModalConfig()"
                class="bg-red-500 text-white rounded-full w-6 h-6 text-center absolute top-2 right-2 cursor-pointer">
                <img src="./assets/close.png" alt="">
            </div>

            <form action="/user/alterar" method="post" enctype="multipart/form-data"
                class="flex items-start justify-evenly h-full flex-col p-4 w-full" id="updateUser">

                <label for="inputAlterarBanner"
                    class="flex items-center flex-col justify-start gap-4 hover:bg-gray-600 w-full p-2 cursor-pointer rounded-sm">
                    <div id="alterarBanner" class="w-full h-48 bg-cover bg-center"></div>
                    <p class="font-osvaldo text-white font-extralight text-lg">Alterar banner</p>
                    <input id="inputAlterarBanner" type="file" name="profileBanner"
                        class="text-white font-osvaldo font-light hidden">
                </label>

                <label for="inputAlterarPfp"
                    class="flex items-center justify-start gap-4 hover:bg-gray-600 w-full flex-col p-2 cursor-pointer rounded-sm">
                    <div id="alterarPfp" class="w-24 h-24 bg-cover bg-center"></div>
                    <p class="font-osvaldo text-white font-extralight text-lg">Alterar foto de perfil</p>
                    <input id="inputAlterarPfp" type="file" name="profilePicture"
                        class="text-white font-osvaldo font-light hidden">
                </label>


                <label for="alterarUsername"
                    class="flex items-center justify-start gap-4 hover:bg-gray-600 w-full flex-col p-2 cursor-pointer rounded-sm">
                    <input type="text" id="alterarUsername"
                        class="text-center outline-none text-white bg-lightpurple-0 h-8 w-full">
                    <p class="font-osvaldo text-white font-extralight text-lg">Alterar nome de exibição</p>
                </label>

                <div class="flex justify-center items-center w-full gap-4">
                    <input type="submit" value="ALTERAR"
                        class="bg-yellow-400 p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-yellow-500 w-1/4" />
                </div>
            </form>
        </div>

    </div>

    <div id="modalImage"
        class="fixed bg-black w-full h-full bg-opacity-50 items-center justify-center hidden cursor-zoom-out z-20"
        onclick="hiddeModal()">
        <div id="bigImageModal" class=" w-4/5 h-4/5 rounded-lg">
            <div id="bigImage" class="w-full h-full bg-contain bg-no-repeat bg-center "></div>
        </div>
    </div>

    <div id="modalAlterar" class="fixed bg-black w-full h-full bg-opacity-50 items-center justify-center hidden z-20">
        <div id="alterarBox" class="w-1/2 h-32 bg-land-0 flex flex-col rounded-md gap-2 p-2">
            <input type="text" id="descAlterada"
                class="outline-none h-12 bg-lightpurple-0 p-2 rounded-sm placeholder-white text-white">
            <div class="flex gap-2">
                <button id="cancelarAlteracao" onclick="hiddeModalAlterar()"
                    class="bg-red-500 font-bold text-white p-2 rounded-md">Cancelar</button>
                <button id="alterarDesc" class="bg-yellow-400 font-bold text-white p-2 rounded-md">ALTERAR</button>
            </div>
        </div>
    </div>

    <div id="modalComentarios"
        class="fixed bg-black w-full h-full bg-opacity-50 hidden items-center justify-center z-20">

        <div id=" commentSection"
            class="relative bg-land-0 flex flex-col rounded-sm p-2 gap-2 w-2/5 h-2/3 overflow-y-auto overflow-x-hidden">

            <div class="w-6 h-6 bg-red-500 absolute top-2 right-2 rounded-sm flex items-center justify-center cursor-pointer"
                onclick="hiddeModalComentarios()">
                <p class="text-white text-lg font-bold">X</p>
            </div>

            <div id="postComment" class="mt-12 w-full flex gap-2">
                <input type="text" id="commentDescription"
                    class="outline-none w-full bg-lightpurple-0 p-2 rounded-sm placeholder-white text-white"
                    placeholder="Publique um comentário">
                <button id="publicarComentario"
                    class="bg-yellow-400 p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-yellow-500">Enviar</button>
            </div>

        </div>
    </div>


    <header class="flex top-0 sticky justify-end items-center w-full p-5 gap-3 bg-bg-0 z-50">
        <div id="minimizeBtn" title="Minimize"
            class="topBtn minimizeBtn w-5 h-5 bg-green-500 rounded-full cursor-pointer hover:scale-110 transition-all duration-200">
        </div>
        <div id="maxResBtn" title="Maximize"
            class="maxResBtn w-5 h-5 bg-yellow-300 rounded-full cursor-pointer hover:scale-110 transition-all duration-200">
        </div>
        <div id="closeBtn" title="Close"
            class="topBtn closeBtn w-5 h-5 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition-all duration-200">
        </div>
    </header>

    <!-- header com botoes customizados para fechar e minimizar ---------------------------------------------------------------------->

    <!-- header logo pesquisa e perfil -->
    <header class="w-full bg-bg-0 sticky top-14 z-10 flex items-center justify-around p-2">
        <div class="w-40 flex items-center justify-center" onclick=" goToHome()">
            <img src="../feed/assets/logo.png" alt="logo da empresa dev to dev"
                class="w-36 transition-all duration-200 hover:scale-110 hover:cursor-pointer ">
        </div>

        <!-- pesquisa -->
        <span class="flex items-center justify-center w-5/12">
            <div class="h-9 bg-lightpurple-0  p-2 flex items-center justify-center rounded-s-sm">
                <img src="../feed/assets/lupa.png" alt="" class="w-6 h-6 bg-lightpurple-0  hover:cursor-pointer">
            </div>

            <input type="search" placeholder="Pesquisa"
                class="h-9 w-full bg-lightpurple-0 rounded-e-sm outline-none placeholder-white text-white">
        </span>
        <div class="w-40 flex items-center justify-center gap-8">
            <div id="usericon"
                class="w-16 h-16 transition-all duration-200 hover:scale-110 hover:cursor-pointer rounded-full bg-cover bg-center bg-no-repeat"
                onclick="goToProfile()">
            </div>
            <img src="assets/logout.png" alt="botão para sair" class="w-7 hover:cursor-pointer" onclick="logoff()">
        </div>
    </header>

    <div id="banner" class="w-full h-96 bg-white flex justify-center items-center relative"
        style="background-size: cover; background-position: center;">

        <div class="flex items-center justify-between w-full p-28 relative">

            <!-- <p id="followersCount" class="font-osvaldo text-white font-light text-2xl absolute top-0 left-44"
                style="top: 20rem;"></p>

            <div id="followersField"
                class="w-1/5  h-12 rounded-sm bg-green-400 absolute right-12 flex items-center justify-center left-12"
                style="top: 24rem ;">
            </div> -->

            <div id="userGiantIcon" class="hover:cursor-pointer rounded-full w-40 h-40 bg-cover bg-center" style=" position:absolute; top: 13.5rem ;  left: 50%;
            transform: translate(-50%, 0);">
            </div>

            <div id="createGamePage"
                class="w-1/5  h-12 rounded-sm bg-green-400 absolute right-14 flex items-center justify-center hover:bg-green-600 cursor-pointer"
                style="top: 24rem ;" onclick="formGamePage()">
                <p class="font-osvaldo text-white font-light text-2xl">+ Nova página</p>
            </div>
        </div>

        <p id="profileName" class="absolute -bottom-28 left-1/2 text-white font-osvaldo font-light text-4xl"
            style="transform: translate(-50%, 0);"></p>

        <p id="profileUserName" class="absolute -bottom-36 left-1/2 text-white font-osvaldo font-thin text-2xl"
            style="transform: translate(-50%, 0);"></p>

        <img src="./assets/config.png" alt="config"
            class="w-10 absolute top-4 right-4 cursor-pointer hover:scale-105 transition-all duration-100"
            id="configIcon" onclick="hiddeModalConfig()">
    </div>

    <main class="flex items-start justify-around w-full mt-40">

<div class="flex-col h-full w-96">

    <div class="flex-col items-start justify-center bg-land-0 w- rounded-md">
        <div class="flex p-5 space-x-5 hover:cursor-pointer hover:bg-gray-500 hover:rounded-md" onclick="goToFeed()">
            <img src="./assets/web-content.png" class="w-7" alt="">
            <p class="text-white">Feed</p>
        </div>
        <div class="flex p-5 space-x-5 hover:cursor-pointer hover:bg-gray-500 hover:rounded-md" onclick="goToGames()">
            <img src="./assets/console.png" class="w-7" alt="">
            <p class="text-white">Jogos</p>
        </div>
    </div>

    <!-- FAIXA DA ESQUERDA -->
        <div id="navLeft" class="flex flex-col items-start justify-center bg-land-0 w-1/1 h-96 rounded-md mt-12">
    </div>
</div>

        <!-- FAIXA DE POSTS DO MEIO -->
        <div id="postMain" class="flex flex-col items-start justify-start w-5/12 h-full gap-10">

            <div id="createPost" class="flex bg-land-0 w-full h-40 rounded p-2">

                <form id="uploadForm" action="/upload" method="post" enctype="multipart/form-data"
                    class="flex flex-col w-full justify-around items-start">

                    <input type="text" name="descImage" id="descImage" placeholder="Publique suas ideias!"
                        class="w-full outline-none bg-lightpurple-0 h-12 p-2 rounded-sm placeholder-white text-white" />
                    <input type="file" name="postImage" id="imagem" class="text-white" />

                    <input type="submit" value="PUBLICAR"
                        class="bg-yellow-400 p-2 rounded-sm text-white font-bold cursor-pointer hover:bg-yellow-500" />

                </form>

            </div>
            <div id="localPosts"
                class="flex items-start justify-start flex-col bg-bg-0 w-full h-full rounded-t-md gap-8">
            </div>

        </div>

        <!-- FAIXA DA DIREITA -->
        <div id="navRight" class="flex items-start justify-center bg-land-0 w-1/5 h-96 rounded-md">
        </div>


        </main>
        <footer class="w-full p-4">
        </footer>
        </body>
        <script src="index.js"></script>
        <script defer src="../../scripts/winButtons.js"></script>
        
        </html>
        `;

            const perfilFilePath = path.join(perfilDir, `${username}.html`);

            fs.writeFile(perfilFilePath, perfilHTML, (err) => {
                if (err) {
                    res.status(500).json(err).end();
                } else {
                    res.status(201).end();
                }
            })
        } else
            res.status(500).json(err).end();
    })
}

const listar = (req, res) => {
    let user = new User(req.params)
    con.query(user.read(), (err, result) => {
        if (err == null)
            res.json(result).end();
    })
}

const upload = multer({ storage: storage });

const alterar = (req, res) => {
    upload.any()(req, res, (err) => {
        if (err) throw err;

        const userId = req.body.id;
        const name = req.body.name;

        // Verifica se o arquivo de banner está presente e não está vazio
        if (req.files && req.files.length > 0 && req.files[0].fieldname === 'profileBanner') {
            const profileBanner = req.files[0];
            const { buffer } = profileBanner;

            cloudinary.uploader.upload_stream((error, result) => {
                if (error) throw error;

                const { url } = result;

                const sql = 'UPDATE users SET name = ?, profileBanner = ? WHERE id = ?';

                con.query(sql, [name, url, userId], (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir imagem do banner no banco de dados: ' + err.message);
                        res.status(500).send('Erro ao fazer o upload da imagem do banner.').end();
                    } else {
                        console.log('Imagem do banner inserida com sucesso.');
                        res.status(200).json(result).end();
                    }
                });
            }).end(buffer);
        }

        // Verifica se o arquivo de imagem de perfil está presente e não está vazio
        if (req.files && req.files.length > 0 && req.files[0].fieldname === 'profilePicture') {
            const profilePicture = req.files[0];
            const { buffer } = profilePicture;

            cloudinary.uploader.upload_stream((error, result) => {
                if (error) throw error;

                const { url } = result;

                const sql = 'UPDATE users SET name = ?, profilePicture = ? WHERE id = ?';

                con.query(sql, [name, url, userId], (err, result) => {
                    if (err) {
                        console.error('Erro ao inserir imagem do perfil no banco de dados: ' + err.message);
                        res.status(500).send('Erro ao fazer o upload da imagem do perfil.').end();
                    } else {
                        console.log('Imagem do perfil inserida com sucesso.');
                        res.status(200).json(result).end();
                    }
                });
            }).end(buffer);
        }
    });
};


const excluir = (req, res) => {
    let user = new User(req.params)
    con.query(user.delete(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(204).end()
        else
            res.status(404).end()
    })
}

const login = (req, res) => {
    let user = new User(req.body)
    con.query(user.login(), (err, result) => {
        if (err == undefined) {
            if (result.length == 0) {
                res.status(401).json({ "msg": "Login ou Senha Invalidos" }).end();
            } else {
                let user = result[0];
                delete user.password;
                res.status(200).json(user).end();
            }
        } else {
            res.status(401).json(err).end();
        }
    })
}

module.exports = {
    criar,
    listar,
    alterar,
    excluir,
    login
}