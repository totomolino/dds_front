var app = new Vue({
    el: "#vuePerfilRevision",
    data: {                
        publiId:"",
        publicacion:""
        
    },

     //NOSE QUE MIERDA COPIE PERO HAY QUE LLAMAR A LA PUBLICACION ADOPCION PARA MOSTRAR LA INFO DE CADA PERFIL 
     // HAY QUE IR A BUSCAR LAS PUBLICACIONES EN REVISION
     //SI EL VOLUNTARIO LA APRUEBA CAMBIAR EL ESTADO DE LA PUBLICACION A APROBADA PARA QUE SE MUESTRA EN LAS PUBLICACIONES PERDIDAS
     //SI NO LA APRUEBA NOSE, LOLA

    methods: {
        validar: function(){ 
            
            fetch("http://localhost:4567/patitas/aprobarPublicacion/" + this.publiId)
            .then(Response => Response.json())
            .then(() => {                
                alert('se creo la publicacion')
            })
            .then(() => {                
                document.getElementById("publicaciones").click();
            })


            

        },
        denegar: function(){
            document.getElementById("inicio").click();
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