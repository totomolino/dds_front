var app = new Vue({
    el: "#vueAdop",
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
        fetch("https://patitasback.herokuapp.com/patitas/publicacion/adopcion") 
            .then(response =>{
                status = response.status
                return response.json()})
            .then(data => {
                error(status, data.mensaje)
                this.publicaciones = data.publicaciones
            })                                                                                                                     
    }   
    
    //DE ALGUNA MANERA GUARDAR EL ID DE LA MASCOTA SELECCIONADA EN LA TARJETA PARA DESPUES MOSTRAR EL PERFIL 
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}

