

  export function validarFormularioIngreso() {   



    let inputNombre = document.querySelector(".nombre").value;
    let inputApellido = document.querySelector(".apellido").value;
    let emailEmpleado = document.querySelector(".email__empleado").value;
    let usuarioEmpleado = document.querySelector(".usuario__empleados").value; 
      let entrada=true
    let usuarioContraseña = document.querySelector(".usuario__contraseña").value; 

    console.log(usuarioEmpleado) 
    
  
    let nombreValidado = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-]+$/;
    let apellidoValidado = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-]+$/
    let emailValidar = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let usuariolValidar = /^[a-zA-Z0-9_-]{3,16}$/;
    let validarContraseña =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
     
       const containerIconIngreso1 = document.getElementById('container-ingreso-1');
        const containerIconIngreso2 = document.getElementById('container-ingreso-2');
        const containeringreso3 = document.getElementById('container-ingreso-3');
        const containeringreso4 = document.getElementById('container-ingreso-4');
        const containeringreso5 = document.getElementById('container-ingreso-5');
        const containeringreso6 = document.getElementById('container-ingreso-6');
  
    // Limpiar iconos antes de la validación
    containerIconIngreso1.style.display ='none';
    containerIconIngreso2.style.display ='none';

    containeringreso4.style.display = 'none'; 
    containeringreso5.style.display = 'none';
    containeringreso6.style.display = 'none';

    if (!inputNombre) {
    containerIconIngreso1.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!nombreValidado.test(inputNombre)) {
    containerIconIngreso1.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    if (!inputApellido) {
    containerIconIngreso2.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!apellidoValidado.test(inputApellido)) {
    containerIconIngreso2.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

   
    if (!emailEmpleado) {
      containeringreso4.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!emailValidar.test(emailEmpleado)) {
     containeringreso4.style.display = 'flex'; // Muestra el error
        entrada = false;
    } 

    if (!usuarioEmpleado) {
      containeringreso5.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!usuariolValidar.test(usuarioEmpleado)) {
     containeringreso5.style.display = 'flex'; // Muestra el error
        entrada = false;
    } 

    if (!usuarioContraseña) {
      containeringreso6.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!validarContraseña.test(usuarioContraseña)) {
     containeringreso6.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    return entrada; // Devuelve el estado de entrada
}