
     //NOSE QUE MIERDA COPIE PERO HAY QUE LLAMAR A LA PUBLICACION ADOPCION PARA MOSTRAR LA INFO DE CADA PERFIL
     // SI EL DUENIO ENCUENTRA SU MASCOTA -> NOTIFICAR AL RESCATISTA  

     var app = new Vue({
        el: "#vuePerfilPerdide",
        data: {                
            publiId:"",
            publicacion:""
            
        },
    
        methods: {
            perdide: function(){
                fetch("http://localhost:4567/patitas/esMia/" + this.publiId)
                document.getElementById("inicio").click()
            }            
        },
        created(){
            const urlParams = new URLSearchParams(window.location.search);
    
            const publiID = urlParams.get("id");
    
            if(publiID == null){
                alert("No selecciono ninguna publicacion")
                return;
            }
            else this.publiId = publiID;
            
            fetch("http://localhost:4567/patitas/damePublicacion/" + publiID)
            .then(Response => Response.json())
            .then(algo => {this.publicacion = algo})
        }     
    })
    
    function error(status, mensaje){
        if(status == 400 || status == 500){
            alert(mensaje)
            return;
        }
    }