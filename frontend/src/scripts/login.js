const iUsername = document.getElementById("createUsername");
const iEmail = document.getElementById("email");
const iPassword = document.getElementById("createPassword");
const iConfirmPassword = document.getElementById("confirmPassword");

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
    if (iPassword.value == iConfirmPassword.value) {
        let user = {
            "username": iUsername.value,
            "email": iEmail.value,
            "name": iUsername.value,
            "password": iPassword.value
        }
        api.post("/user", user)
            .then(resp => {
                alert("Cadastrado com sucesso")
                iUsername.value = ""
                iEmail.value = ""
                iPassword.value = ""
                iConfirmPassword.value = ""
            })
    } else {
        console.log("errou")
    }

} 
