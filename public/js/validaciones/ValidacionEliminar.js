

 export async function  validadEliminado(){  
    
    const inputUser = document.getElementById("input-user").value;
    const inputPass = document.getElementById("input-pass").value;
  

    const mensajeErrorUser=document.getElementById("container-A") 
    const mensajeErrorPass=document.getElementById("container-B")
    const inputEliminarValidado=  /^[a-zA-Z0-9_-]{3,16}$/;; 
    const passwordEliminarValidado=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/; 
    let entrada=true 
     mensajeErrorUser.style.display="none"
     mensajeErrorPass.style.display="none"

    

    if(!inputUser){ 
        mensajeErrorUser.style.display="flex" 
        entrada=false
      

       
    } 

    else if(!inputEliminarValidado.test(inputUser)){ 
        mensajeErrorUser.style.display="flex" 
        entrada=false
    

    } 

    if(!inputPass){ 
        entrada=false
        mensajeErrorPass.style.display="flex"
        entrada=false
      

       
    } 

    else if(!passwordEliminarValidado.test(inputPass)){ 

        mensajeErrorPass.style.display="flex" 
        entrada=false
    

    } 

   

    return entrada


 }


