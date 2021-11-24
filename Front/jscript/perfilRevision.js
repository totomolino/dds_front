var app = new Vue({
    el: "#vuePerfilPerdide",
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
        preguntas:[]
        
    },

     //NOSE QUE MIERDA COPIE PERO HAY QUE LLAMAR A LA PUBLICACION ADOPCION PARA MOSTRAR LA INFO DE CADA PERFIL 
     // HAY QUE IR A BUSCAR LAS PUBLICACIONES EN REVISION
     //SI EL VOLUNTARIO LA APRUEBA CAMBIAR EL ESTADO DE LA PUBLICACION A APROBADA PARA QUE SE MUESTRA EN LAS PUBLICACIONES PERDIDAS
     //SI NO LA APRUEBA NOSE, LOLA

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
            fetch("http://localhost:4567/patitas/publicacion/adopcion", {
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                status = Response.status
                return Response.json()})
            .then(data => {
                error(status,data.mensaje)
                alert("Se creo la publicacion, sos una pesima persona, tu perrito te va a extraniar")
                document.getElementById("adoptar").click();
            })

        }
        
    },
    created(){
        const urlParams = new URLSearchParams(window.location.search);

        const mascId = urlParams.get("id");

        if(mascId == null){
            alert("No selecciono ninguna mascota")
            return;
        }
        else this.mascota = mascId                                                                                                                    

        fetch("https://localhost:4567/patitas/damePreguntas/1")
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