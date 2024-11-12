import dotenv, { config } from "dotenv"; 
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

config() 

const pool = await mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}); 


export async function queryDelete(req,res){ 
    const { Token } = req.params; // Se obtiene el Token de los parámetros de la URL
    console.log("Token recibido:", Token);

    try {
        // Verificación del token usando jwt.verify
        const verificacion = jwt.verify(Token, process.env.JTW_BORRADO);
        console.log("Token verificado:", verificacion);

        // Verifica si el token es válido (si verificacion contiene datos)
        if (!verificacion || !verificacion.email) {
            return res.status(400).json({ err: 'Hubo un error con el token.' });
        }

        
        const [prueba] = await pool.query("DELETE FROM empleados WHERE email=?", [verificacion.email]);
        console.log("Resultado de la eliminación:", prueba);
        res.redirect("http://localhost:7000");
          return prueba[0]
   
     
    } 
    catch (err) {
        // Manejo de errores si el token es inválido o cualquier otro error ocurre
        console.error("Error en la verificación del token:", err);
        res.status(500).json({ message: 'Hubo un error con la verificación del token', err });
    }


   
} 

export function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'No autorizado, falta token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token no válido' });
        }
        req.user = user;
        next();
    });
} 
