import {  respuestaInsercion } from "../Controllers/Controladores.js";
import { verificarMailControlador} from "../Controllers/Controladores.js"
import {obtenerUsers} from "../Controllers/Controladores.js"
import { loginController} from "../Controllers/Controladores.js"
import {validarController} from "../Controllers/Controladores.js"
import {eliminarController} from "../Controllers/Controladores.js"
import {upload} from "../Controllers/Controladores.js" 
import {queryDelete,authenticateToken, renovacionToken } from "../middleware/Funciones.js" 




import express from 'express';

const router = express.Router(); 

router.post('/formulario',upload.single('imagen') , respuestaInsercion) 
router.get('/verificar-email/:token',verificarMailControlador) 
router.get("/recibir-info",obtenerUsers)  
router.post("/login",loginController) 
router.put("/validar-contrasena",validarController) 
router.delete("/eliminar-user",eliminarController) 
router.get('/ruta-protegida', authenticateToken) 
 router.get("/ruta-reenvio/:token",renovacionToken)
router.get("/ruta-eliminacion/:Token",queryDelete) 


export default router




