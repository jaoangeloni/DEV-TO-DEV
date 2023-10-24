
//importação dos inputs
const iUsername = document.getElementById("createUsername");
const iEmail = document.getElementById("email");
const iPassword = document.getElementById("createPassword");
const iConfirmPassword = document.getElementById("confirmPassword");

const urlPicture = [
    'htts://res.cloudinary.com/dneit0fsb/image/upload/v1698154247/userPFP/lgtnoe2gu1vd6ftx7tsh.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/f3zyn9lj8napedc0z4d5.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156381/userPFP/htg5hc2ythoo02rs1rmx.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/jkegbvvkxk8erjczei0b.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/jyqghxavml3tobbxyu5x.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698154247/userPFP/lgtnoe2gu1vd6ftx7tsh.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/tvapbm9wrn0aptbzvibh.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156381/userPFP/upqfsurp38xl4zrcxago.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/uv57qvwimmfteekzzzpf.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156380/userPFP/vp6qrl7e1carvzv44c2w.png',
    'http://res.cloudinary.com/dneit0fsb/image/upload/v1698156381/userPFP/yhayu5azqj0btenjceex.png'
]

const imagemAleatoria = Math.floor(Math.random() * urlPicture.length);
urlAleatoria = urlPicture[imagemAleatoria];

const urlBanner = 'https://assets.tumblr.com/images/default_header/optica_pattern_05.png'

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



//função de cadastrar
function cadastrar() {
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
            "profilePicture": urlAleatoria,
            "profileBanner": urlBanner
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

