var appU = new Vue({
    el: "#appVue",
    data: {
        nombre:"",
        formasNotif2: [],
        persId:""
    },
    methods: {
    },
    created(){
        var idSesion = localStorage.getItem("IDSESION") //recupera ID
            fetch("https://patitasfront.herokuapp.com/patitas/misDatos", {
                headers: {
                    "Authorization": idSesion //se envia el IDSESION para identificar al usuario en backend
                }
            }) //~(°-°~) ~(°-°)~ (~°-°)~
                .then(response => response.json())
                .then(objeto => {
                    
                    this.nombre = objeto.nombre
                    localStorage.setItem("IDPERSONA", objeto.persId)})
            
        }  
})


function agarrarStatus(status){
    if(status == 400){    
        alert("Debes iniciar sesion");
        document.getElementById("volver").click();
    }
}

