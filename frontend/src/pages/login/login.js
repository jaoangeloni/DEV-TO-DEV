const fs = require('fs');
const imagePath = './assets/userpfp/';

//importação dos inputs
const iUsername = document.getElementById("createUsername");
const iEmail = document.getElementById("email");
const iPassword = document.getElementById("createPassword");
const iConfirmPassword = document.getElementById("confirmPassword");

//importação dos elementos do modal
const modalError = document.getElementById("modalError");
const modalIcon = document.getElementById("modalIcon");
const warning = document.getElementById("warning");

//função para mostrar modal
function showModal(string, error) {
    if (error == 0) {
        modalIcon.src = './assets/error.png';
    } else {
        modalIcon.src = './assets/right.png';
    }

    warning.innerHTML = string;
    modalError.classList.remove("opacity-0");
    modalError.classList.add("opacity-100");
}


function readImageFile(path) {
    try {
        const imageData = fs.readFileSync(path);
        return imageData;
    } catch (err) {
        console.error('Erro ao ler o arquivo de imagem:', err);
        return null;
    }
}

//função de cadastrar
function cadastrar() {
    const images = [
        imagePath + 'default01.png',
        imagePath + 'default02.png',
        imagePath + 'default03.png',
        imagePath + 'default04.png',
        imagePath + 'default05.png',
        imagePath + 'default06.png',
        imagePath + 'default07.png',
        imagePath + 'default08.png',
        imagePath + 'default09.png',
        imagePath + 'default10.png',
        imagePath + 'default11.png',
        imagePath + 'default12.png',
    ];

    const aleatorio = Math.floor(Math.random() * images.length);

    if (iUsername.value == "" || iEmail.value == "") {
        let string = "Preencha todos os campos";
        showModal(string, 0);
    } else if (iPassword.value != iConfirmPassword.value) {
        let string = "Senhas não conferem";
        showModal(string, 0);
    } else if (iPassword.value == iConfirmPassword.value) {

        let user = {
            "username": iUsername.value,
            "email": iEmail.value,
            "name": iUsername.value,
            "password": iPassword.value,
        }
        api.post("/user/cadastrar", user)
            .then(resp => {
                if (resp.status == 206) {
                    let string = resp.data.msg;
                    showModal(string, 0);
                } else {
                    let string = "Cadastrado com sucesso";
                    showModal(string, 1);

                    setTimeout(() => {
                        modalError.classList.remove("opacity-100");
                        modalError.classList.add("opacity-0");
                    }, 5000);

                    iUsername.value = "";
                    iEmail.value = "";
                    iPassword.value = "";
                    iConfirmPassword.value = "";

                    backToLogin();
                }
            }
            )
    }

}

const username = document.getElementById("user")
const password = document.getElementById("senha")
//funçao de login
function autenticar() {
    let data = {
        "username": username.value,
        "password": password.value
    }

    api.post("/user/login", data)
        .then(resp => {
            if (resp.status == 200) {
                localStorage.setItem("user", JSON.stringify(resp.data));
                window.location.href = "../feed/feed.html";

                ipc.send('maximizeRestoreApp')
            } else if (resp.status == 206) {
                let string = resp.data.error;
                showModal(string, 0);
            }
        })

}

