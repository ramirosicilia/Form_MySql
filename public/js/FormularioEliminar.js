

import{validadEliminado} from "./validaciones/ValidacionEliminar.js"

 const formularioEliminar=document.getElementById("formulario-eliminar") 


 formularioEliminar.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputUser = document.getElementById("input-user").value;
  const inputPass = document.getElementById("input-pass").value;

  // Guardar los valores en el localStorage
  

  const emailEmpleado = JSON.parse(localStorage.getItem("email"));
  console.log(emailEmpleado);

  if (!validadEliminado()) {
      return;
  }

  try {
      // Enviar los datos como JSON en el cuerpo de la solicitud
      const responseEliminar = await fetch('http://localhost:7000/eliminar-user', {
          method: "DELETE", // Puedes usar POST si prefieres
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              eliminarUsuario: inputUser,
              eliminarPass: inputPass
          })
      });

      const data = await responseEliminar.json(); 
      console.log(data)

      if (data.err) {
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
              return;
          }

          // Redirigir al usuario al home del correo
          window.location.href = redirectUrl;

          e.target.reset();
      }
  } catch (err) {
      console.log('Hubo un error en el backend:', err);
  }
});
