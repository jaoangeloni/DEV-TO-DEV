const userId = document.querySelector("#userId");
const senha = document.querySelector("#senha");

function autenticar() {
    let data = {
        "userId": userId.value,
        "senha": senha.value
    }

    let options = {
        "method": "POST",
        "headers": {
            "Content-Type":"application/json"
        },
        "body": JSON.stringify(data)
    }
    
    fetch("http://localhost:3000/login", options)
    .then(resp => { return resp.json() })
    .then(info => {
        if(info.id != undefined) {
            localStorage.setItem("usuario", JSON.stringify(info));

            window.location.href="";
        }else {
            alert("Usuario ou Senha inválidos");
        }
    })
}