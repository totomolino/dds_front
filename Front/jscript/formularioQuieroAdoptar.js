
var app = new Vue({
    el: "#appVueQuieroAdoptar",
    data: {
        nombre:"",
        apodo:"",
        sexo:"",
        especie:"",
        edad:"",
        descripcion:"",
        fotos:[],
        idPers:"",
        idMasc:"",
        preguntas:[],
        respuestas:[],
        preguntasOrdenadas:[],
        comodidades:[],
        respuestasComo:[],
        comodidadesOrdenadas:[]
    },

    //PREGUNTAR AL ADOPTANTE POR SUS CARACTERISTICAS Y PREFERENCIAS
    //CREAR LA PUBLI QUIERO ADOPTAR -> MANDAR MAIL AL ADOPTANTE CON UN LINK 
    //PARA DARSE DE BAJA DE LAS RECOMENDACIONES


    methods:{
        registrar: async function(){
            if (validateNotNullImput(this)) {

                this.idPers = localStorage.getItem("IDPERSONA")
                await this.crearMascota()
                await this.agregarFotos()
                await this.cargarCaracteristicas()
                alert("SE CREO LA MASCOTA")
                document.getElementById("volverInicio").click();
                
            } else {
                alert("TENES QUE COMPLETAR TODOS LOS CAMPOS")
            };
        },
       
     
   
      
        mezclarListas: function(){
            const lista = this.respuestas.map((resp, index)=> 
                ({
                   carMasMas_mascota:{
                    masc_id: parseInt(this.idMasc)
                   },
                   carMasMas_valor: resp,
                   carMasMas_carmas: {
                       carmas_clave: this.preguntasOrdenadas[index]
                   }
                }))
                return lista
        },

        agregarCaracteristica: function (event, pos){
            var carac = event.target.value
            if(carac != ""){
                this.respuestas[pos] = carac
                console.log(this.respuestas)
            }
            else{
                this.respuestas [pos] = null
                console.log(this.respuestas)
            }
            
        },
        agregarPreguntas: function (event, pos){
            var preg = event.target.value
            if(preg != ""){
                this.preguntasOrdenadas[pos] = preg
                console.log(this.preguntasOrdenadas)
            }
            else{
                this.preguntasOrdenadas [pos] = null
                console.log(this.preguntasOrdenadas)
            }
            
        },
        agregarComodidades: function (event, pos){
            var preg = event.target.value
            if(preg != ""){
                this.comodidadesOrdenadas[pos] = preg
                console.log(this.comodidadesOrdenadas)
            }
            else{
                this.comodidadesOrdenadas [pos] = null
                console.log(this.comodidadesOrdenadas)
            }
            
        },

        cargarCaracteristicas: function (){

            return new Promise(resolve => {  


                var lista = this.mezclarListas(this.preguntasOrdenadas, this.respuestas)

                var req = {
                    "caracteristicas": lista
                }
    
                fetch("http://localhost:4567/patitas/mascotaCarac", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    error(Response.status, "No se agregaron las caracteristicas")
                    return Response.json()})
                .then(data => {                    
                    resolve('se agregaron las caracteristicas')
                })
    
    
    
                })


        },


        crearPubli: function(){       
            const idPers = localStorage.getItem("IDPERSONA")     
            let req = {
                "publ_organizacion":{
                    "orga_id":1
                },
                "publ_estado":"ACTIVA",
                "pdar_mascota":{
                    "masc_id":this.mascota
                },
                "pdar_duenio":{
                    "pers_id":parseInt(idPers)
                }
            }
            var status
            fetch("http://localhost:4567/patitas/publicacion/adopcion", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)
                alert("Se envio tu formulario, recibirás recomendaciones sobre mascotas en adopción semanalmente")
                document.getElementById("adoptar").click();
            })

        }

    },




    created(){
        fetch("http://localhost:4567/patitas/orga/caracteristicas/1" )
        .then(Response => Response.json())
        .then(data => {
            this.preguntas = data.caracteristicas
        })
        .then(() => {
            fetch("http://localhost:4567/patitas/damePreguntas/1" )
            .then(Response => Response.json())
            .then(data => {
                this.comodidades = data.preguntas
            })
        })

        
    }
    
})

function errorMascota(status){
    error(status, "La mascota no fue creada")
}
function errorFotos(status){
    error(status, "Las fotos no fueron cargadas")
}
function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}

const validateNotNullImput = data => {
    const {fotos, preguntas, respuestas, preguntasOrdenadas, idMasc, idPers, ...elResto} = data._data
  
    return Object.values(elResto).every( e => e != "") && (fotos.length > 0)
}


