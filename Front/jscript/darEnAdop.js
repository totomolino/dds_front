var app = new Vue({
    el: "#vueAdop",
    data: {                
        mascotas:[]
    },
    methods: {
        getFoto: function(index){

            var mascota = this.mascotas[index]

            var foto = mascota.fotoAnimales[0]


            if(foto == null){
                return "../fotos/caraPerrito.jpeg"
            }else
            return 'background-image: url("' + foto.direccion + '")'

        }
    },
    created(){
        var idSesion = localStorage.getItem("IDSESION") 
        fetch("https://patitasback.herokuapp.com/patitas/duenio/mascotas", {
            headers: {
                "Authorization": idSesion 
            }
        })
            .then(response => response.json())
            .then(data => {
                this.mascotas = data.mascotas
                console.log(this.mascotas)
            })
                                                                                                                     
    }     
})