import {validarFormularioContraseña}from "./validaciones/ValidacionesContraseñas.js" 



const formularioContraseñas = document.querySelector("#contraseñas-form"); 


    formularioContraseñas.addEventListener("submit", async (e) => {
        e.preventDefault();

        const contraseña1 = document.getElementById("contraseñas-user").value;
        const contraseña2 = document.getElementById("contraseñas-user-2").value;
        const ingresoUsuario = document.getElementById("ingreso-usuario").value;
       const nuevoUsuario = document.getElementById("nuevo-usuario").value;

       

        // Llamar a la función de validación
        if (!validarFormularioContraseña()) {
            return; // Si hay errores, no continuar
        }

        // Si la validación pasa, se ejecuta la solicitud
        try { 

            let emailEmpleado=JSON.parse(localStorage.getItem('email')) 


            const response = await fetch("http://localhost:7000/validar-contrasena", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contraseña1, contraseña2, ingresoUsuario, nuevoUsuario }),
            });

            const data = await response.json();
            if (!data.ok) {
                alert(data.err);
            } else { 

               const emailDomain = emailEmpleado.split('@')[1];
                let redirectUrl;
                        
                // Redirigir según el dominio
                if (emailDomain === 'gmail.com') {
                  redirectUrl = 'https://mail.google.com/';
                } else if (emailDomain === 'hotmail.com' || emailDomain === 'live.com') {
                  redirectUrl = 'https://outlook.live.com/';
                } else if (emailDomain === 'yahoo.com') {
                  redirectUrl = 'https://mail.yahoo.com/';
                } else {
                  alert("Dominio de correo no soportado. Por favor, accede a tu proveedor de correo directamente.");
                  return; // Si no es un dominio soportado, salir de la función
                }
            
                // Redirigir al usuario al home del correo
                window.location.href = redirectUrl;
                
            }
        } catch (err) {
            console.error("Error al enviar los datos", err);
        }
    });
 

