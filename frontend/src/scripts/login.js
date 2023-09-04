const iUsername = document.getElementById("createUsername");
const iEmail = document.getElementById("email");
const iPassword = document.getElementById("createPassword");
const iConfirmPassword = document.getElementById("confirmPassword");
const modalError = document.getElementById("modalError");
const modalIcon = document.getElementById("modalIcon");
const warning = document.getElementById("warning");

// function autenticar() {
//     let data = {
//         "userId": userId.value,
//         "senha": senha.value
//     }

//     let options = {
//         "method": "POST",
//         "headers": {
//             "Content-Type":"application/json"
//         },
//         "body": JSON.stringify(data)
//     }

//     fetch("http://localhost:3000/login", options)
//     .then(resp => { return resp.json() })
//     .then(info => {
//         if(info.id != undefined) {
//             localStorage.setItem("usuario", JSON.stringify(info));

//             window.location.href="";
//         }else {
//             alert("Usuario ou Senha inválidos");
//         }
//     })
// }

function cadastrar() {


    if (iUsername.value == "" || iEmail.value == "") {
        warning.innerHTML = "Preencha os campos corretamente";
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
    } else if (iPassword.value != iConfirmPassword.value) {
        warning.innerHTML = "Senhas não conferem";
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
    }
    else if (iPassword.value == iConfirmPassword.value && iPassword.value > 6) {
        warning.innerHTML = "Cadastrado com sucesso";
        modalIcon.src = './assets/right.png';
        modalError.classList.remove("opacity-0");
        modalError.classList.add("opacity-100");
        setTimeout(() => {
            modalError.classList.remove("opacity-100");
            modalError.classList.add("opacity-0");
        }, 3000)
        let user = {
            "username": iUsername.value,
            "email": iEmail.value,
            "name": iUsername.value,
            "password": iPassword.value
        }
        api.post("/user", user)
            .then(resp => {
                iUsername.value = ""
                iEmail.value = ""
                iPassword.value = ""
                iConfirmPassword.value = ""
            })
    }

}

