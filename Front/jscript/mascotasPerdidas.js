var app = new Vue({
    el: "#vuePerdidas",
    data: {                
        publicaciones:[]
    },
    methods: {
        getFoto: function(index){

            var publicacion = this.publicaciones[index]

            var foto = publicacion.fotos[0]


            if(foto == null){
                return "../fotos/caraPerrito.jpeg"
            }else
            return 'background-image: url("' + foto.direccion + '")'

        },
        dameUrl: function(publi){
            return "PerfilPerdide.html?id=" + publi
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
                this.publicaciones = data
            })                                                                                                                     
    }
    
    
    //DE ALGUNA MANERA GUARDAR EL ID DE LA MASCOTA SELECCIONADA EN LA TARJETA PARA DESPUES MOSTRAR EL PERFIL 
    // FILTRAR PUBLICACIONES PERDIDAS QUE ESTEN APROBADAS POR LOS VOLUNTARIOS
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}