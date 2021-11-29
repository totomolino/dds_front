var status 



function iniciarSesion(usuarioOemail, contrasenia){

    fetch("https://patitasback.herokuapp.com/patitas/iniciarSesion", {

        method: "POST",
        body: JSON.stringify({
            "usuario_Email":usuarioOemail,
            "contrasenia":contrasenia
        })

    })
    .then(Response => agarrarStatus(Response.status))

}

function agarrarStatus(status, tipo){
    if(status == 200){
        if(tipo.toUpperCase() == "RESCATISTA"){
            document.getElementById("anchorID2").click();
        }
        else document.getElementById("anchorID").click();
    }
    else{
        alert("Usuario o contrasenia incorrecto");
    }
}



var app = new Vue({
    el: "#appVue",
    data: {
        username: "",
        password: "",        
    },
    methods: {
        login: function () {

            var status;
            
            var req = {
                "usuario_Email": this.username,
                "contrasenia":this.password
            }
            if(req.usuario_Email == "" || req.contrasenia == ""){
                alert("Debes ingresar los campos")
                return;
            }
            fetch("https://patitasback.herokuapp.com/patitas/iniciarSesion", {

            method: "POST",
            body: JSON.stringify(req)
        })
        .then(Response =>{
            status = Response.status;
            return Response.json()
        })
        .then(datos => {
            localStorage.setItem("IDSESION", datos.idSesion)
            localStorage.setItem("TIPO", datos.tipo)
            agarrarStatus(status, datos.tipo)                
        })
        
        }
    }
})

    
function curtite(){
    
    alert("Bueno curtite gat@");
    
}
