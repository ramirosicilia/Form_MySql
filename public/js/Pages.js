
let icono=document.getElementById('icon') 
let contaiseSection=document.getElementById('container-session')
const botonSi=document.getElementById('boton-yes') 
const botonNo=document.getElementById('boton-No')


icono.addEventListener('click',(e)=>{  
   e.preventDefault()
    e.stopPropagation()
    contaiseSection.classList.add("active-session")

    botonSi.addEventListener('click',(e)=>{ 
        e.preventDefault()
     
        if(botonSi.textContent==="Si"){ 
          let confirmacion=confirm("esta seguro que desea cerrar seccion") 
          contaiseSection.classList.remove("active-session")
              window.location.href="http://localhost:7000"

        }

    }) 

    botonNo.addEventListener('click',(e)=>{ 
        e.preventDefault()
      

        if(botonNo.textContent==="No"){ 
     
          contaiseSection.classList.remove("active-session")
            

        }

    }) 


   
})