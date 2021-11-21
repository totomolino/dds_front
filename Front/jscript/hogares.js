




const dameHogares = async () => {
    
    let lista = [];
    const total = await fetch('https://api.refugiosdds.com.ar/api/hogares?offset=1',{
        headers: {
            "Authorization": "Bearer GGiskO98Hf6oSNEYMUWHDpvcc5kl4B9ZdgtMnLhEqotpVd8FXafMp7YF5gYi" 
        }
    })
    .then(response => response.json())
    .then(x => x.total);
    
    
    const cantidadPaginas = Math.ceil(total/10.0);

    for(let i = 1; i<= cantidadPaginas ; i++){
        const unElem = await damePaginaHogares(i);
        lista = lista.concat(unElem);
    }
    return lista
} 


const damePaginaHogares = async (offset) =>
    fetch(`https://api.refugiosdds.com.ar/api/hogares?offset=${offset}`,{
        headers: {
            "Authorization": "Bearer GGiskO98Hf6oSNEYMUWHDpvcc5kl4B9ZdgtMnLhEqotpVd8FXafMp7YF5gYi" 
        }
    })
    .then(response => response.json())
    .then(data => data.hogares);



var app = new Vue({
    el: "#vueHogares",
    data: { 
        hogares:[]    
    },
    methods: {
        
    },
    async created(){
       
        this.hogares = await dameHogares();
                                                                                                                     
    }
})