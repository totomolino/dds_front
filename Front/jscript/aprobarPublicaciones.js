var app = new Vue({
    el: "#vueprobar",
    data: {                
        publicaciones:[]
    },
    methods: {
        getFoto: function(index){

            var publicacion = this.publicaciones[index]

            var foto = publicacion.mascota.fotos[0]


            if(foto == null){
                return "../fotos/caraPerrito.jpeg"
            }else
            return 'background-image: url("' + foto.direccion + '")'

        }
    },
    created(){
        var status
        fetch("http://localhost:4567/patitas/publicacion/perdida") 
            .then(response =>{
                status = response.status
                return response.json()})
            .then(data => {
                error(status, data.mensaje)
                this.publicaciones = data.publicaciones
            })                                                                                                                     
    }   
    
    //DE ALGUNA MANERA GUARDAR EL ID DE LA MASCOTA SELECCIONADA EN LA TARJETA PARA DESPUES MOSTRAR EL PERFIL 
    //MOSTRAR SOLO LAS PUBLICACIONES QUE ESTAN EN REVISION -> Y SE CREARON EN ENCONTRE MASCOTA 
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}