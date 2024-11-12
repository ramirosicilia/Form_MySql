import { ValidacionformularioLogin } from "./validaciones/ValidacionesLogin.js";
import {obtenerCookies} from "./function/funcionObtencionCookies.js"

const formularioLogin = document.getElementById("login"); 
const containerCookies=document.getElementById('container-cookies') 
const botonAceptar=document.getElementById('boton-si') 
const botonRechazar=document.getElementById('boton-no') 


let cookiesDenegadas = true; 

setTimeout(() => { 

    containerCookies.classList.add('active-cookies') 
    botonAceptar.addEventListener('click',async(e)=>{  

        
        if(e.target.value==="si"){  
           alert('usted acepto las cookies ahora puede enviar el formulario de logueo!')
           cookiesDenegadas=false
           containerCookies.classList.remove('active-cookies') 

            
        }  

        else{
            alert('no se pudieron obtener las cookies')
        }

    }) 

    botonRechazar.addEventListener('click',async(e)=>{  

        if(e.target.value==="no"){  
           
            cookiesDenegadas = true; 
            alert('no va a poder ingresar, tiene que aceptar las cookies ')
            containerCookies.classList.remove('active-cookies') 
   
            
        }  
      

    }) 
  
}, 800);


 


formularioLogin.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    
    if (cookiesDenegadas) {
        e.preventDefault();  // Esto evita que el formulario se envíe
        alert("Debe aceptar las cookies para continuar.");
        window.location.reload()
        return;
    }
    




    const usuarioIngresado = document.getElementById("usuario-ingresado").value; 
    const passWordIngresado = document.getElementById("usuario-password").value;

    // Validación del formulario
    if (!ValidacionformularioLogin()) {  
        return;
    }

    try {
        // Solicitud al backend para iniciar sesión
        const peticion = await fetch("http://localhost:7000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", 
            body: JSON.stringify({
                userInto: usuarioIngresado,
                passwordInto: passWordIngresado,
            }),
        });

        // Manejo de errores de la petición
        if (!peticion.ok) {
            const errorDatos = await peticion.json();
            alert("Error: " + errorDatos.err);
            return;
        } 
        
        // Procesamiento de la respuesta del servidor
        let datos = await peticion.json();
        console.log(datos);
        
        // Guarda el token en la cookie
        if (datos.token) {
            document.cookie = `token=${datos.token}; path=/;`; 
            let obtenerCookie = await obtenerCookies();
        
        } else {
            alert("Token no recibido");
            return;
        }

        // Abre la URL deseada
        if (datos.respuesta) {
            window.open(datos.respuesta, "_blank"); 
            setTimeout(() => { 
                window.location.reload();
            }, 200);
            
          
        }

       
         
    } catch (err) {
        console.error("Error al ingresar los datos:", err);
    } 

    
   
   
});  




