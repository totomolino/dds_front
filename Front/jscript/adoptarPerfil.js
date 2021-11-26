var app = new Vue({
    el: "#vueAdoptarMasc",
    data: {                
        idMascota:"",
        mascota:{
            "id":"",
            "especie":"",
            "nombre":"",
            "apodo":"",
            "edad":"",
            "sexo": [],
            "descripcion":"",
            "tieneChapita":"",
            "fotos":[]    
        },
        preguntas: [],
        caracteristicas: []
        
    },

    //NOSE QUE MIERDA COPIE PERO HAY QUE LLAMAR A LA PUBLICACION ADOPCION PARA MOSTRAR LA INFO DE CADA PERFIL 
    // CUANDO EL ADOPTANTE APRETA EL BOTON ADOPTAR -> NOTIFICAR AL DUENIO 
    
    methods: {          
        adoptarMascota: function(){
            const url = "http://localhost:4567/patitas/mascota/adoptar/" + this.idMascota
            const req = {
                "mascota": this.idMascota,
                "adoptante": localStorage.getItem("IDPERSONA")
            }
            fetch(url,{
                method: "POST",
                body: JSON.stringify(req)
            })
            .then(Response => {
                error(Response.status, "No se pudo adoptar a la mascota")
                return Response.json()
            })
            .then(algo => {
                alert(algo.mensaje)
                document.getElementById("index").click();
                //apretar algun boton xd
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
        else this.idMascota = mascId                                                                                                                    

        const url = "http://localhost:4567/patitas/mascota/" + mascId
        fetch(url)
        .then(Response => Response.json())
        .then(algo => {
            this.mascota = algo.mascota
            this.preguntas = algo.preguntas
            this.caracteristicas = algo.caracJSON
        })
    
    }     
})

function error(status, mensaje){
    if(status == 400 || status == 500){
        alert(mensaje)
        return;
    }
}