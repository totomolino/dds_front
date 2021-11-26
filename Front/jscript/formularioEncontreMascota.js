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
                alert("SE COMPLETO EL FORMULARIO CORRECTAMENTE")
                document.getElementById("volverInicio").click();
                
            } else {
                alert("TENES QUE COMPLETAR TODOS LOS CAMPOS")
            };
        },
        guardarFotos: function (event){
            
            // Array.from(event.target.files).forEach(foto => this.getBase64(foto))
            // this.fotos = event.target.files
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

        
        // HAY QUE VER SI LA MASCOTA TIENE CHAPITA O NO, SI NO TIENE CHAPITA
        // HAY QUE CREAR LA MASCOTA, SI TIENE HAY LA MASCOTA YA ESTA CREADA

         crearRescate: function() {
            
         return new Promise(resolve => {
            // var geocoder = new google.maps.Geocoder();
            // var address = this.ubicacion;
            
            // geocoder.geocode( { 'address': address}, function(results, status) {
            
            //   if (status == google.maps.GeocoderStatus.OK) {
            //     this.latitud = results[0].geometry.location.lat();
            //     this.longitud = results[0].geometry.location.lng();                
            //   } 
            // });  

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
                fetch("http://localhost:4567/patitas/rescate", {
                    method: "POST",
                    body: JSON.stringify(req)
                })
                .then(Response => {
                    errorRescate(Response.status)
                    return Response.json()})
                .then(data => {
                    this.idResc = data.resc_id
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
    
                fetch("http://localhost:4567/patitas/rescate/fotos", {
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
        }
    },


        // HAY QUE CREAR LA PUBLICACION MASCOTA PERDIDA SI LA MASCOTA NO TIENE CHAPITA -> CON ESTADO "EN REVISION"
        //CONTACTAR AL DUENIO SI LA MASCOTA TIENE CHAPITA 

    created(){
        this.idMasc = localStorage.getItem("mascEncontrada")

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
    const {idMasc, idPers, ...elResto} = data._data
  
    return Object.values(elResto).every( e => e != "") && (fotos.length > 0)
}


function initMap() {
    const mapOptions = {
      zoom: 8,
      center: { lat: -34.397, lng: 150.644 },
    };
  
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  
    const marker = new google.maps.Marker({
      // The below line is equivalent to writing:
      // position: new google.maps.LatLng(-34.397, 150.644)
      position: { lat: -34.397, lng: 150.644 },
      map: map,
    });
    // You can use a LatLng literal in place of a google.maps.LatLng object when
    // creating the Marker object. Once the Marker object is instantiated, its
    // position will be available as a google.maps.LatLng object. In this case,
    // we retrieve the marker's position using the
    // google.maps.LatLng.getPosition() method.
    const infowindow = new google.maps.InfoWindow({
      content: "<p>Marker Location:" + marker.getPosition() + "</p>",
    });
  
    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });
  }