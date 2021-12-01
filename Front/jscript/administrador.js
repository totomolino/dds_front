let dea;
var app = new Vue({
    el: "#appVueAdmin",
    data: {
       
        usernameAdmin:"",
        passwordAdmin:"",
        password2Admin:"",
        emailAdmin:"",                
        usernameVolu:"",
        passwordVolu:"",
        password2Volu:"",
        emailVolu:"",
        tamanioFotosVolu:"",
        voluOrga:"",
        voluId:"",
        adminId:"",
    },

    //LOS ADMINS CREAN OTROS ADMINS
    //LOS ADMIN AGREGAN CARACTERISTICAS DE MASCOTAS 
    
    methods:{
        registrarVoluntario: async function(){            

            await this.crearUsuarioVoluntario()
            await this.crearVoluntario()
            
            alert('SE CREO EL VOLUNTARIO CORRECTAMENTE')
            document.getElementById("recargar").click()

        }, 
        registrarAdmin: async function(){            

            await this.crearUsuarioAdmin()
            await this.crearAdmin()
            
            alert('SE CREO EL ADMIN CORRECTAMENTE')
            document.getElementById("recargar").click()
        },        
              
        
        crearUsuarioAdmin: function() {
            return new Promise(resolve => { 
                if(this.passwordAdmin != this.password2Admin){ 
                    alert("La contrasenia debe coincidir")
                    return;
                }
                var req = {
                "usu_email": this.emailAdmin,
                "usu_contrasena": this.passwordAdmin,
                "usu_nombre": this.usernameAdmin,
                "usu_tipo": "ADMIN"
            }
            var status
            fetch("https://patitasback.herokuapp.com/patitas/user", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje) 
                this.adminId = data.usuario.usu_id                               
                resolve('se creo el usuario')
                
            })})
           
            
        },
        crearAdmin: function(){
            return new Promise(resolve => {
                var req = {
                    "admin_organizacion":{
                        "orga_id": 1
                    },
                    "admin_usuario":{
                        "usu_id":parseInt(this.adminId)
                    }
                }
            var status;
            fetch("https://patitasback.herokuapp.com/patitas/admin", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status;
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)                 
                resolve('se creo el Admin')                
            })
        })},
        crearUsuarioVoluntario: function() {
            return new Promise(resolve => {
                if(this.passwordVolu != this.password2Volu){ 
                    alert("La contrasenia debe coincidir")
                    return;
                } 
                var req = {
                "usu_email": this.emailVolu,
                "usu_contrasena": this.passwordVolu,
                "usu_nombre": this.usernameVolu,
                "usu_tipo": "VOLUNTARIO"
            }
            var status
            fetch("https://patitasback.herokuapp.com/patitas/user", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje) 
                this.voluId = data.usuario.usu_id
                resolve('se creo el usuario')
            })})
                      
        },
        crearVoluntario: function(){
            return new Promise(resolve => {
                var req = {
                "volu_tamFotos": this.tamanioFotosVolu,
                "volu_organizacion":{
                    "orga_id":parseInt(this.voluOrga)
                },
                "volu_usuario":{
                    "usu_id":parseInt(this.voluId)
                }
            }
            var status;
            fetch("https://patitasback.herokuapp.com/patitas/voluntario", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status;
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)                 
                resolve('se creo el Voluntario')                
            })
        })}
    }
})








function errorUser(status){
    error(status, "El usuario no fue creado")    
}

function errorDuenio(status){
    error(status, "El duenio no fue creado")
}

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}


