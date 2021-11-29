var app = new Vue({
    el: "#vuePregDarAdop",
    data: {                
        mascota:"",
        pasear:"",
        veces:"",
        donde:"",
        comidaTipo:"",
        comida:"",
        comidaTipo:"",
        medicamentosBool:"",
        medicamentos:"",
        preguntas:[],
        respuestasOrdenadas: []
        
    },
    methods: {
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
            fetch("https://patitasback.herokuapp.com/patitas/publicacion/adopcion", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)
                alert("Se creo la publicacion, sos una pesima persona, tu perrito te va a extraniar")
                
                return data.objeto.publ_id;
            })
            .then(publi => {
                var lista = this.mezclarListas(publi)
                let req2 = {
                    "preguntas":lista
                }
                fetch("https://patitasback.herokuapp.com/patitas//publicacion/adopcion/preguntas", {
                    method: "POST",
                    body: JSON.stringify(req2)
                })
                .then(respuesta => respuesta.json())
            })
            .then(() => document.getElementById("adoptar").click())            


        },
        agregarPreguntas: function (event, pos){
            var preg = event.target.value
            if(preg != ""){
                this.respuestasOrdenadas[pos] = preg
                // console.log(this.preguntasOrdenadas)
            }
            else{
                this.respuestasOrdenadas[pos] = null
                // console.log(this.preguntasOrdenadas)
            }
            
        },
        mezclarListas: function(idPubli){
            const lista = this.respuestas.map((resp, index)=> 
                ({
                   preg_publi:{
                    publi_id: parseInt(idPubli)
                   },
                   respuesta: resp,
                   pregunta: this.preguntas[index]
                   
                }))
                return lista
        },
        
    },
    created(){
        const urlParams = new URLSearchParams(window.location.search);

        const mascId = urlParams.get("id");

        if(mascId == null){
            alert("No selecciono ninguna mascota")
            return;
        }
        else this.mascota = mascId                                                                                                                    

        fetch("https://patitasback.herokuapp.com/patitas/damePreguntas/1")
        .then(Response => Response.json())
        .then(algo => {this.preguntas = algo.preguntas})
    }     
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}