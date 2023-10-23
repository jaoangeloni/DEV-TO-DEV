const fs = require('fs');
const path = require('path');
const con = require('../db/connect');
const User = require('../models/user');

const criar = (req, res) => {
    let user = new User(req.body)
    con.query(user.create(), (err, result) => {
        if (err == null) {
            const userId = result.userId;
            const username = user.username; // Suponha que você tenha um campo 'username' no seu modelo de usuário

            // Crie um diretório para armazenar os arquivos de perfil, se não existir
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
                <title>Página de perfil</title>
                <link rel="stylesheet" href="../../../dist/output.css">
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Passero+One&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet">
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
                <script src="../../scripts/api.js"></script>
            </head>
            
            <body class="w-full  bg-bg-0" onload="loadPosts()">
            
                <header class=" flex top-0 sticky justify-end items-center w-full p-5 gap-3 bg-gray-50">
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
            
                <header class="w-full h-28 bg-bannerfoda bg-cover flex items-center justify-around">
                    <div class="w-40 flex items-center justify-center" onclick="goToHome()">
                        <img src="../feed/assets/logo.png" alt="logo da empresa dev to dev"
                            class="w-36 transition-all duration-200 hover:scale-110 hover:cursor-pointer">
                    </div>
            
                    <!-- pesquisa -->
                    <span class="flex items-center justify-center w-2/6">
                        <div class="h-9 bg-gray-200  p-2 flex items-center justify-center rounded-s-lg">
                            <img src="../feed/assets/lupa.png" alt="" class="w-6 h-6 bg-gray-200  hover:cursor-pointer">
                        </div>
            
                        <input type="search" placeholder="Pesquisa" class="h-9 w-full bg-gray-200 rounded-e-lg outline-none">
                    </span>
            
                    <div class="w-40 flex items-center justify-center" onclick="goToHome()">
                        <img src="./assets/default.png" alt="usericon"
                            class="w-16 transition-all duration-200 hover:scale-110 hover:cursor-pointer">
                    </div>
                </header>
            
                <div id="perfil" class="w-full flex justify-center relative"
                    style="background-color: blueviolet; height: 30vh; background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWQSJ5wjfQt44YM6_8AfuMEqjVH4Q0Bws2SulxRSzF-B1qKLJHy4tbKxnrYchBv-WUaXk&usqp=CAU'); background-repeat:no-repeat; background-position: center;">
                    <div class="bg-white rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-100"
                        style="position: absolute; margin-top: 10rem; border-color: black;">
                        <img src="./assets/default.png" alt="" style="width: 9vw;">
                    </div>
                    <div class="absolute top-0 right-0 hover:cursor-pointer" id="camera">
                        <img src="./assets/camera.png" alt="" class="hover:scale-110 transition-all duration-100"
                            style="width: 2vw; margin-left: 115rem;">
                    </div>
                </div>
            
                <main class="flex items-start justify-around w-full" style="margin-top: 6rem;">
            
                    <!-- FAIXA DA ESQUERDA -->
                    <div id="navLeft" class="flex items-start justify-center bg-land-0 w-1/5 h-96 rounded-md">
                        <p>a</p>
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
            
                            <!-- <div id="post" class="w-full rounded-t-sm static bg-gray-200">
                            <div id="postHeader"
                                class="bg-gray-200 w-full h-auto p-4 flex flex-col items-start justify-start gap-4 rounded-t-md">
            
                                <div id="generic" class="w-full flex gap-2 justify-between items-center relative">
            
                                    <div id="modalSettings"
                                        class="bg-white w-36 h-20 absolute top-12 right-0 rounded-lg hidden flex-col items-start justify-between p-2">
            
                                        <div id="alterarPost" class="flex gap-4 hover:bg-gray-100 cursor-pointer"
                                            onclick="excluirPost()">
                                            <img id="alterarIcon" src="./assets/edit.webp" alt="" class="w-6 h-6">
                                            <p id="alterarTitle">Alterar post</p>
                                        </div>
            
                                        <div id="excluirPost" class="flex gap-4 hover:bg-gray-100 cursor-pointer"
                                            onclick="atualizarPost()">
                                            <img id="excluirIcon" src="./assets/delete.webp" alt="" class="w-6 h-6">
                                            <p id="excluirTitle">Excluir post</p>
                                        </div>
            
                                    </div>
            
                                    <div id="generic-child" class="flex">
                                        <img id="userPfp" src="./assets/default.png" alt="imagmedousuario"
                                            class="w-16 rounded-full">
            
                                        <div id="generic-child-child"
                                            class="font-osvaldo font-thin flex flex-col items-center justify-center">
            
                                            <p id="name" class="font-light text-2xl">Jose Ruela da Silva</p>
                                            <p id="username" class="font-extralight text-lg">#JoseRuelaDaSilva24032</p>
                                        </div>
            
                                    </div>
            
                                    <img id="settingsMenu" src="./assets/menu.png" alt="" class="w-5 h-5 cursor-pointer"
                                        onclick="openSettings()">
            
                                </div>
            
                                <p id="descImage" class="font-osvaldo font-light text-lg">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eum, explicabo officiis
                                    libero temporibus aliquam quod iusto fuga sunt eligendi dolorem nisi quia facere quam
                                    asperiores dolorum fugit voluptate quo.</p>
                            </div>
            
                            <div id="postImage" class="w-full h-96 bg-gray-50"></div>
            
                            <div id="postFooter" class="w-full items-start justify-start p-2 flex gap-4 bg-gray-200">
                                <div id="footer-child1"
                                    class="bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100"
                                    onclick="like()">
            
                                    <img id="likeIcon" src="./assets/like.png" alt="like" class="w-6 h-6">
                                    <p id="likeCount">123</p>
            
                                </div>
                                <div id="footer-child2"
                                    class="bg-gray-50 w-20 h-10 rounded-full flex items-center justify-between p-2 gap-3 cursor-pointer hover:scale-105 transition-all duration-100">
                                    <img id="commentIcon" src="./assets/comment.png" alt="like" class="w-6 h-6">
                                    <p id="CommentCount">123</p>
                                </div>
                            </div>
            
                        </div> 
            
                        <div class="bg-gray-200 border-t-2 border-t-gray-50 w-full h-8 flex items-center justify-center">
                            <p class="font-extralight font-osvaldo underline text-lg cursor-pointer hover:font-light"
                                onclick="modalComentarios()">Ver
                                mais</p>
                        </div> -->
            
                        </div>
            
                    </div>
            
                    <!-- FAIXA DA DIREITA -->
                    <div id="navRight" class="flex items-start justify-center bg-land-0 w-1/5 h-96 rounded-md"></div>
            
                </main>
            
            </body>
            <script src="index.js"></script>
            <script defer src="../../scripts/winButtons.js"></script>
            
            </html>
        `;

            // Caminho completo para o arquivo HTML de perfil
            const perfilFilePath = path.join(perfilDir, `${username}.html`);

            // Crie o arquivo HTML de perfil
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

const alterar = (req, res) => {
    let user = new User(req.body);
    con.query(user.update(), (err, result) => {
        if (result.affectedRows > 0)
            res.status(202).end()
        else
            res.status(404).end()
    })
}

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