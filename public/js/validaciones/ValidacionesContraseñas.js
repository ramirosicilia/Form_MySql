

 export function validarFormularioContraseña() {  

    const containerIcon1 = document.getElementById('container-1');
    const containerIcon2 = document.getElementById('container-2');
    const containerIcon3 = document.getElementById('container-3');
    const containerIcon4 = document.getElementById('container-4');

    const contraseña1 = document.getElementById("contraseñas-user").value;
    const contraseña2 = document.getElementById("contraseñas-user-2").value;
    const ingresoUsuario = document.getElementById("ingreso-usuario").value;
    const nuevoUsuario = document.getElementById("nuevo-usuario").value;

    const contraseña1Validara = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
    const contraseña2Validara = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_ -])[A-Za-z\d@$!%*?&_ -]{8,15}$/;
    const usuarioValidadoIngresado = /^[a-zA-Z0-9_-]{3,16}$/;
    const nuevoUsuarioIngresado = /^[a-zA-Z0-9_-]{3,16}$/;

    let entrada = true;



    // Limpiar iconos antes de la validación
    containerIcon1.style.display = 'none';
    containerIcon2.style.display = 'none';
    containerIcon3.style.display = 'none';
    containerIcon4.style.display = 'none';

    if (!ingresoUsuario) {
        containerIcon1.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!usuarioValidadoIngresado.test(ingresoUsuario)) {
        containerIcon1.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    if (!nuevoUsuario) {
        containerIcon2.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!nuevoUsuarioIngresado.test(nuevoUsuario)) {
        containerIcon2.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    if (!contraseña1) {
        containerIcon3.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!contraseña1Validara.test(contraseña1)) {
        containerIcon3.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    if (!contraseña2) {
        containerIcon4.style.display = 'flex'; // Muestra el error
        entrada = false;
    } else if (!contraseña2Validara.test(contraseña2)) {
        containerIcon4.style.display = 'flex'; // Muestra el error
        entrada = false;
    }

    return entrada; // Devuelve el estado de entrada
}