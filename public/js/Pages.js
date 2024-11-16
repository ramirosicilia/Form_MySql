


let arreData=[] 
const containerPages=document.querySelector('.container__pages')


async function obtenerDatos(){

    try{ 

        const response= await fetch ("http://localhost:7000/recibir-info") 
        const data= await response.json() 
       return data

    } 

    catch(err){
        console.log('error al obtener los datos')
    }
} 

async function recibirData(){ 

    const dat= await obtenerDatos() 

    arreData=[dat] 

 console.log(arreData)

    arreData.forEach(element=>{ 
        containerPages.innerHTML=` 
         <div class="contenedor__pagina"> 

                    <figure >
                        <img class="imagen__logeo" src="${element.imagenes}" alt="">
                    </figure> 


                    <div class="info">
                        <h2>Usuario: ${element.usuarios}</h2>
                        <h2>Nombre:  ${element.nombre}</h2>
                        <h2>Apellido:${element.apellido}</h2>
                        <label for="">escribe un post</label>
                        <textarea name="textarea" id=""></textarea>
               
                    </div>

                </div>
        

         
        ` 
        console.log(element.imagenes)

    })

} 

recibirData() 

let botonEnviar=document.querySelector('.button_style') 
console.log(botonEnviar) 

const containersession=document.querySelector(".container__session") 
const botonSi=document.getElementById('boton-yes') 
const botonNo=document.getElementById('boton-No') 
let entrada=true


document.getElementById('icon').addEventListener('click',(e)=>{ 
    e.preventDefault() 
    e.stopPropagation()

    if(entrada){ 
        containersession.classList.add('active-session')  
        entrada=true

    } 
    else{ 
        containersession.classList.remove('active-session') 
        entrada=false

    }  
    entrada=!entrada


   
})  

 botonSi.addEventListener('click',activar) 
 botonNo.addEventListener('click',desactivar)


function activar(e){  
    e.stopPropagation();

    if(e.target.value==="si"){
        window.location.href="./index.html"
       
    } 


} 

function desactivar(e){ 
    e.stopPropagation();

    if(e.target.value==="no"){
        containersession.classList.remove('active-session') 
    } 


}