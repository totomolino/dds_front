
var app = new Vue({
    el: "#appVueQuieroAdoptar",
    data: {
        idPers:"",
        idAdop:"",
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
        registrarAdop: async function(){
            if (validateNotNullImput(this)) {

                this.idPers = localStorage.getItem("IDPERSONA")
                await this.crearAdoptante()
                await this.guardarComodidades()
                await this.guardarPreferencias()
                await this.crearPublicacion()
                alert("SE CREO EL ADOPTANTE")
                document.getElementById("volverInicio").click();
                
            } else {
                alert("TENES QUE COMPLETAR TODOS LOS CAMPOS")
            };
        },    
   
      
        mezclarListasComodidades: function(){
            const lista = this.respuestasComo.map((resp, index)=> 
                ({
                   comoXad_adoptante:{
                    pers_id: parseInt(this.idAdop)
                   },
                   comoXad_valor: resp,
                   comoXad_como: {
                       como_clave: this.comodidadesOrdenadas[index]
                   }
                }))
                return lista
        },
        mezclarListasPreferencias: function(){
            const lista = this.respuestas.map((resp, index)=> 
                ({
                   prefXado_adoptante:{
                        pers_id: parseInt(this.idAdop)
                   },
                   prefXado_valor: resp,
                   prefXado_pref: {
                       pref_clave: this.preguntasOrdenadas[index]
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
        agregarRespuestasComo: function (event, pos){
            var carac = event.target.value
            if(carac != ""){
                this.respuestasComo[pos] = carac
                console.log(this.respuestasComo)
            }
            else{
                this.respuestasComo [pos] = null
                console.log(this.respuestasComo)
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

        crearAdoptante: function (){

            return new Promise(resolve => { 
                    
                fetch("https://patitasback.herokuapp.com/patitas/adoptante/crear/" + this.idPers, {
                    method: "POST"
                })
                .then(Response => {                                         
                     return Response.json()
                })
                .then(aa => {                    
                    this.idAdop = aa.id                 
                    resolve('se creo el adoptante')
                })
    
    
    
                })

        },
        crearPublicacion: function (){

            return new Promise(resolve => { 
                const req = {
                    "padop_adoptante":{
                        "pers_id":parseInt(this.idAdop)
                    } ,
                    "publ_organizacion":{
                        "orga_id":1
                    },
                    "publ_estado":"APROBADA"
                }
                    
                fetch("https://patitasback.herokuapp.com/patitas/publicacion/adoptar", {
                    method: "POST",
                    body: JSON.stringify(req)

                })
                .then(Response => {                                         
                     return Response.json()
                })
                .then(aa => {                                                       
                    resolve('se creo la publi')
                })
    
    
    
                })

        },

        guardarComodidades: function(){      
            
            return new Promise(resolve => { 
                    let lista = this.mezclarListasComodidades();
                    let req = {
                        "comodidades": lista
                    }                    
                    fetch("https://patitasback.herokuapp.com/patitas/adoptante/comodidades", {
                        method: "POST",
                        body: JSON.stringify(req)
                    })
                    .then(Response => Response.json())                        
                    .then(() => {
                        resolve('Se guardaron las comodidades')
                    })
    
                })           
        },
        guardarPreferencias: function(){       
            return new Promise(resolve => { 
                let lista = this.mezclarListasPreferencias();
                let req = {
                    "preferencias": lista
                }                    
                fetch("https://patitasback.herokuapp.com/patitas/adoptante/preferencias", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response =>  Response.json())
                .then(() => {
                    resolve('Se guardaron las preferencias')
                })

            }) 

        }

    },




    created(){
        fetch("https://patitasback.herokuapp.com/patitas/orga/caracteristicas/1" )
        .then(Response => Response.json())
        .then(data => {
            this.preguntas = data.caracteristicas
        })
        .then(() => {
            fetch("https://patitasback.herokuapp.com/patitas/damePreguntas/1" )
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
    const {respuestas,respuestasComo, preguntasOrdenadas, idPers,idAdop, ...elResto} = data._data

    return (respuestas.length > 0) && (respuestasComo.length > 0) 
}


