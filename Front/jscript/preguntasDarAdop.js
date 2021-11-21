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
    }     
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}