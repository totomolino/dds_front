
var app = new Vue({
el: "#vueRecomendar",
data: {                
    adopId:"",
    publicaciones:[]
    
},

methods: {
    getFoto: function(index){

        var publicacion = this.publicaciones[index]

        var foto = publicacion.fotos[0]


        if(foto == null){
            return "../fotos/caraPerrito.jpeg"
        }else
        return 'background-image: url("' + foto.direccion + '")'

    },
    dameUrl: function(publi){
        return "perfilPerdide.html?id=" + publi
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
    
    fetch("https://patitasback.herokuapp.com/patitas/publicacionesRecomendadas/" + this.adopId)
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