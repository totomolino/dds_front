let dea;
var app = new Vue({
    el: "#appVueAdmin",
    data: {
       
        username:"",
        password:"",
        password2:"",
        tipo:"",
        usuId:"",
        carac: "",
    },

    //LOS ADMINS CREAN OTROS ADMINS
    //LOS ADMIN AGREGAN CARACTERISTICAS DE MASCOTAS 



    methods:{
        registrarse: async function(){            

            if(this.password != this.password2){ //TODO HAY QUE VER COMO ENTRAR A ESTAS VARIABLES XD
                alert("La contrasenia debe coincidir")
                return;
            }
            await this.crearUsuario()
            
            await this.crearDuenio()

           

          
             if(val == true){ //APRETA OKAY
                localStorage.setItem("personaID", this.idDuenio)
                localStorage.setItem("tipo", this.tipo)
                document.getElementById("agregarContacto").click();
             }else{
                    document.getElementById("index").click();
             }

             

        },        
        
        crearUsuario: function() {
            return new Promise(resolve => { 
                var req = {
                "usu_email": this.email,
                "usu_contrasena": this.password,
                "usu_nombre": this.username,
                "usu_tipo": "ADMIN"
            }
            var status
            fetch("http://localhost:4567/patitas/user", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)
                this.usuId = data.usuario.usu_id
                resolve('se creo el usuario')
            })})
           
            
        }
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


