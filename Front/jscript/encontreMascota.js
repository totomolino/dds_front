var app = new Vue({
    el: "#appVueEncontre",
    data: {
    },
    methods:{
        empezarForm: function(){

           var val =  confirm("¿Tiene una cuenta de rescatista?")

           if( val == true){//SI TIENE CUENTA
            document.getElementById("conUsuario").click();
            
        }else //No tiene cuenta
            {
               document.getElementById("sinUsuario").click();
            }
        }
    },
    created(){
        const urlParams = new URLSearchParams(window.location.search);

        const mascId = urlParams.get("id");

        if(mascId == null){
            localStorage.setItem("mascEncontrada", -1)
        }
        else localStorage.setItem("mascEncontrada", mascId)
    }
})
