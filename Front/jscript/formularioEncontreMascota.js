var app = new Vue({
    el: "#appVueEncontreMasc",
    data: {
        fotos:[],
        idPers:"",
        idMasc:"",
        descripcionEstado: "",
        ubicacion: "",
        latitud:"",
        longitud:""
    },
    methods:{
        encontrarMascota: async function(){
            if (validateNotNullImput(this)) {                
                
                await this.crearRescate()
                await this.agregarFotos()
                if(this.idMasc == -1){
                    await this.crearPubli()
                }
                else{
                    await this.notificarDuenio()
                }
                alert("SE COMPLETO EL FORMULARIO CORRECTAMENTE")
                document.getElementById("volverInicio").click();
                
            } else {
                alert("TENES QUE COMPLETAR TODOS LOS CAMPOS")
            };
        },
        crearPubli: function(){
            return new Promise((resolve, reject) => {

                const req = {
                    "pper_rescate":{
                        "resc_id":parseInt(this.idResc),
                    },
                    "publ_organizacion":{
                        "orga_id":1,
                    },
                    "publ_estado":'REVISION'
                }
                
                fetch("https://patitasback.herokuapp.com/patitas/publicacion/perdida", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    error(Response.status, "No se creo la publicacion")
                    return Response.json()
                })
                .then(data => {resolve(data.mensaje)})

            })
        },
        notificarDuenio: function(){
            return new Promise((resolve, reject) => {

                const req = {
                    "mascota":parseInt(this.idMasc)
                }
                
                fetch("https://patitasback.herokuapp.com/patitas/rescate/duenio",{
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    error(Response.status, "No se notifico al duenio")
                    return Response.json()
                })
                .then(data => {resolve(data.mensaje)})


            })
        },
        guardarFotos: function (event){
            

            for(var i = 0; i < event.target.files.length; i++)
            {           
                var file = event.target.files[i]
                this.getBase64(file)
                .then(img => {
                    this.fotos.push(img)
                })
            }
            console.log(this)

        },
        getBase64: function (file) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result)
                };
                reader.onerror = function (error) {
                    reject('Error: ', error);
                }
            })
        },
        cargarCoordenadas: function(){
            const url = 'https://dev.virtualearth.net/REST/v1/Locations?key=AgZeMUipIRXUIPXmKhQZ_pKXLnlVTqo6TSilJLLc1DEJIr4oKZzARC1RZY-HZYtD&countryRegion=argentina&addressLine=' + this.ubicacion 
            fetch(url)
            .then(Response => Response.json())
            .then(dea => {
                const coordenadas = dea.resourceSets[0].resources[0].geocodePoints[0].coordinates
                this.latitud = coordenadas[0]
                this.longitud = coordenadas[1]                
            })
            

        },       


         crearRescate: function() {
            
         return new Promise(resolve => {

            this.cargarCoordenadas()


          var req = {
              "resc_descripcionEstado": this.descripcionEstado,
              "resc_lugarEncuentroX":this.latitud,
              "resc_lugarEncuentroY":this.longitud,
              "resc_rescatista":{
                  "pers_id": parseInt(this.idPers)
              },
              "resc_mascota":{
                  "masc_id":parseInt(this.idMasc)
              }                                 
          }                                            
                fetch("https://patitasback.herokuapp.com/patitas/rescate", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    errorRescate(Response.status)
                    return Response.json()})
                .then(data => {
                    this.idResc = data.rescate
                    resolve('se creo el rescate')
                })
                
                

            })
            
        },    
        agregarFotos: function () {
            return new Promise(resolve => {  
                const lista = this.transformarFotos()
                var req = {
                    "fotos": lista
                }
    
                fetch("https://patitasback.herokuapp.com/patitas/rescate/fotos", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    errorFotos(Response.status)
                    return Response.json()})
                .then(data => {                    
                    resolve('se agregaron las fotos')
                })
                })
        },

        transformarFotos: function(){            
            const lista = this.fotos.map(foto => 
                ({
                    fore_direccion: foto,
                    fore_rescate:
                    {
                        resc_id: parseInt(this.idResc)
                    } 
                })
            )
            return lista
        },
        dameMapa: function(){
            if(this.ubicacion == "")
            return "https://maps.google.com/maps?q=buenos%20aires&t=&z=13&ie=UTF8&iwloc=&output=embed"

            else return "https://maps.google.com/maps?q="+ this.ubicacion.replace(' ', '%20') + ',buenos%20aires' + "&t=&z=13&ie=UTF8&iwloc=&output=embed"
            
        }
    },
    

        // HAY QUE CREAR LA PUBLICACION MASCOTA PERDIDA SI LA MASCOTA NO TIENE CHAPITA -> CON ESTADO "EN REVISION"
        //CONTACTAR AL DUENIO SI LA MASCOTA TIENE CHAPITA 

    created(){
        let masc =  localStorage.getItem("mascEncontrada")

        if(masc == null){
            this.idMasc = -1 
        }

        this.idPers = localStorage.getItem("IDPERSONA")
    }
    
})

function errorRescate(status){
    error(status, "El rescate no fue creado")
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
    const {idMasc, idPers,fotos,latitud,longitud, ...elResto} = data._data
  
    return Object.values(elResto).every( e => e != "") && (fotos.length > 0)
}

