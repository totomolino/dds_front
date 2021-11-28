
var app = new Vue({
el: "#vueRecomendar",
data: {                
    adopId:"",
    publicaciones:[]
    
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
        window.location.href = "./iniciarSesion.html"
        return;        
    }
    else this.adopId = publiID;
    
    fetch("http://localhost:4567/patitas/publicacionesRecomendadas/" + this.adopId)
    .then(Response => Response.json())
    .then(algo => {this.publicaciones = algo})
}     
})

function error(status, mensaje){
if(status == 400 || status == 500){
    alert(mensaje)
    return;
}
}