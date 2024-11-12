


 export async function obtenerCookies(){ 

    try {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')); 
       console.log(token)
        if (token) {
            const tokenValue = token.split('=')[1];

            const response = await fetch("http://localhost:7000/ruta-protegida", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokenValue}`
                },
                credentials: "include",
            });

            if (!response.ok) {
                const errorDatos = await response.json();
                console.log("Error en la ruta protegida: ", errorDatos);
                return;
            }

            const data = await response.json();
            console.log(data);
        } else {
            console.log("No se encontró el token en las cookies");
        }
    } catch (err) {
        console.log("Error en la ruta protegida", err);
    }


 }