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
function showModal(string){
    warning.innerHTML = string;
    modalError.classList.remove("opacity-0");
    modalError.classList.add("opacity-100");
}

//função de cadastrar
function cadastrar() {


    if (iUsername.value == "" || iEmail.value == "") {
        let string = "Preencha todos os campos";
        showModal(string);
    } else if (iPassword.value != iConfirmPassword.value) {
        let string = "Senhas não conferem";
        showModal(string);
    } else if(iUsername.value.length < 4){
        let string = "O nome deve conter pelo menos 4 caractéres";
        showModal(string);
    } else if(iPassword.value.length < 6){
        let string = "A senha deve conter pelo menos 6 caractéres";
        showModal(string);
    } else if (iPassword.value == iConfirmPassword.value && iPassword.value) {
        let user = {
            "username": iUsername.value,
            "email": iEmail.value,
            "name": iUsername.value,
            "password": iPassword.value
        }
        api.post("/user", user)
            .then(resp => {
                if (resp.status == 206) {
                    let string = resp.data.msg;
                    showModal(string);
                    modalIcon.src = './assets/error.png';
                } else {
                    let string = "Cadastrado com sucesso";
                    showModal(string);
                    modalIcon.src = './assets/right.png';

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
function autenticar(){
    let data = {
        "username": username.value,
        "password": password.value
    }

    api.post("/login", data)
    .then(resp => {
        if(resp.status == 200) {
            localStorage.setItem("user", JSON.stringify(resp.data));
            window.location.href="../pages/feed.html";
        }else if(resp.status == 206){
            let string = resp.data.error;
            showModal(string);
        }
    })

}

