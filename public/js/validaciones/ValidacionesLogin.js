

export function ValidacionformularioLogin(){   

    const containerLogin1 = document.getElementById('container-login-1');
    const containerLogin2 = document.getElementById('container-login-2');
    let entrada=true
  
    const usuarioIngresado = document.getElementById("usuario-ingresado").value; 
    const passWordIngresado = document.getElementById("usuario-password").value;
  
    const usuarioIngresadoValidado = /^[a-zA-Z0-9_-]{3,16}$/; 

    const usuarioIngresadoPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;





    containerLogin1.style.display = 'none';
    containerLogin2.style.display = 'none';

    if (!usuarioIngresado) {
    containerLogin1.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!usuarioIngresadoValidado.test(usuarioIngresado)) {
    containerLogin1.style.display = 'flex'; // Muestra el error
        entrada = false;
    }
  
    if (!passWordIngresado) {
    containerLogin2.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!usuarioIngresadoPassword.test(passWordIngresado)) {
    containerLogin2.style.display = 'flex'; // Muestra el error
        entrada = false;
    }
  
             return entrada
   } 
