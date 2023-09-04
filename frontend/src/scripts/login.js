const iUsername = document.getElementById("createUsername");
const iEmail = document.getElementById("email");
const iPassword = document.getElementById("createPassword");
const iConfirmPassword = document.getElementById("confirmPassword");

const modalError = document.getElementById("modalError");
const modalIcon = document.getElementById("modalIcon");
const warning = document.getElementById("warning");

function cadastrar() {


    if (iUsername.value == "" || iEmail.value == "") {
        warning.innerHTML = "Preencha os campos corretamente";
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
    } else if (iPassword.value != iConfirmPassword.value) {
        warning.innerHTML = "Senhas não conferem";
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
    } else if (iPassword.value == iConfirmPassword.value && iPassword.value) {
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
        let user = {
            "username": iUsername.value,
            "email": iEmail.value,
            "name": iUsername.value,
            "password": iPassword.value
        }
        api.post("/user", user)
            .then(resp => {
                if (resp.status == 206) {
                    warning.innerHTML = resp.data.msg;
                    modalIcon.src = './assets/error.png';
                } else {
                    warning.innerHTML = "Cadastrado com sucesso";
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

