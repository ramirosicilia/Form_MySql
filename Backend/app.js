import express, { query } from "express"; 
import path from "path"; 
import cors from "cors"; 
import dotenv, { config } from "dotenv"; 
import mysql from "mysql2/promise"; 
import { fileURLToPath } from "url"; 
import bcrypt from 'bcryptjs';  
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"; 
import { validarMail } from "./email/EmailEnvio.js";
import {validarReenvio} from "./email/ReenvioMail.js"
 import {emailBorrado}from "./email/MailEliminacion.js"
 import {queryDelete,authenticateToken } from "./middleware/Funciones.js"
 import { v4 as uuidv4 } from 'uuid';
 import multer from "multer";




const app = express();  
const port = 7000;
config(); 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

app.use(cors({
    origin: [
        "http://localhost:7000", 
        "http://127.0.0.1:5500"
    ],
    credentials: true
}));  

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







const pool = await mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}); 

const uuid=uuidv4()



const uploaddirectorio = path.join(__dirname, 'uploads'); 

const storage = multer.diskStorage({ 

  
    destination: (req, file, cb) => {
      cb(null, uploaddirectorio);  // Carpeta donde se almacenan las imágenes
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));  // Nombre único para el archivo
    }
  });
  
  const upload = multer({ storage: storage }); 
  console.log(upload)



app.post('/formulario',upload.single('imagen') ,async (req, res) => {  
    const { nombre, apellido, email,usuarios, contrasena } = req.body; 
    console.log( nombre, apellido, email,usuarios, contrasena)
    
    const imagen = req.file ? req.file.filename : null; // Asegura que haya una imagen 
    console.log(imagen)

    // Construir la URL de la imagen si se cargó correctamente
    const url = imagen ? `http://localhost:${port}/uploads/${imagen}` : null; 
    console.log(url)



    try { 
        let pass = await bcrypt.hash(contrasena, 10);  
        console.log(pass);

        if ( !nombre || !apellido || !email || !usuarios || !pass) { 
            console.log({ nombre, apellido, email, usuarios, pass });
            throw new Error('Campos vacíos');
        } 

        const [existentes] = await pool.query("SELECT usuarios, email FROM empleados WHERE usuarios=? OR email=?", [usuarios, email]); 

        if (existentes.length > 0) { 
            return res.status(400).json({ err: "Usuario ya existente" }); 
        } 

      

        const [row] = await pool.query("INSERT INTO empleados (uuid,nombre, apellido,usuarios,imagenes,contrasenas,email) VALUES (?,?, ?,?,?, ?,?)", [uuid,nombre, apellido,usuarios,url,pass,email]); 
        console.log(row); 

        const tokeMail = jwt.sign({ email }, process.env.JWT_SECRET_EMAIL, { expiresIn: '1h' }); 
        console.log(tokeMail)
      
        await validarMail(email, tokeMail); 

        const [result] = await pool.query("SELECT nombre FROM empleados WHERE uuid=?", [uuid]);

            
        
        console.log(result);  

       
        
        res.json(result); // Envía solo el objeto del nuevo registro
    } catch (err) { 
        console.error('Error---->', err.message);
        res.status(500).send('Ocurrió un error en el backend');
    }
});   

app.get('/verificar-email/:token', async (req, res) => {
    
    const { token } = req.params; 
    console.log(token)

    try {
        const verificacion = jwt.verify(token, process.env.JWT_SECRET_EMAIL);
        const [emailResult] = await pool.query("SELECT email FROM empleados WHERE email=?", [verificacion.email]);

        if (!emailResult.length) {
            return res.status(400).json({ err: 'Usuario no encontrado' });
        }

        await pool.query("UPDATE empleados SET verificado = true WHERE email=?", [verificacion.email]);
        res.redirect('http://localhost:7000/login.html'); // Cambia a la URL real de tu página de login
    } catch (error) {
        console.error('Error en la verificación:', error.message);
        res.status(403).json({ err: 'Token no válido o expirado' });
    }
}); 

app.get("/recibir-info",async(req,res)=>{ 

    try{ 
        const [usuarios]= await pool.query("SELECT * FROM empleados") 

        if(!usuarios.length){
            return res.status(400).send('no se encontraron los usuarios')
        }

        res.json(usuarios[0])
    
        

    } 

    catch(err){
        res.status(500).send('hubo un error al recibir los usuarios')
    }

   


})



app.post("/login", async (req, res) => {
    const { userInto, passwordInto } = req.body; 
    console.log(userInto, passwordInto);

    try { 
        const [obtenerPass] = await pool.query("SELECT uuid, contrasenas FROM empleados WHERE usuarios=?", [userInto]); 
           
        if (obtenerPass.length === 0) { 
            return res.status(404).json({ err: "Usuario no encontrado" });
        } 

        const passOne = obtenerPass[0]; 
        console.log(passOne);

        const verificarPass = await bcrypt.compare(passwordInto, passOne.contrasenas); 
        console.log(verificarPass); 

        const token = jwt.sign({ id: passOne.uuid, usuarios: userInto }, process.env.JWT_SECRET, { expiresIn: '1h' }); 

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
        });

        await pool.query("UPDATE empleados SET token=? WHERE uuid=?", [token, passOne.uuid]);

        if (!verificarPass) { 
            return res.status(401).json({ err: 'Contraseña incorrecta' });
        } 

        res.status(200).json({ respuesta:'http://localhost:7000/pages.html', token });
    } catch (err) {
        console.error('Error en el login:', err.message);
        res.status(500).send('Error en la base de datos'); 
    }
});   




app.put("/validar-contrasena", async (req, res) => {
    const { contraseña1, contraseña2, ingresoUsuario, nuevoUsuario } = req.body;

    if (contraseña1 !== contraseña2) {
        return res.status(400).json({ err: 'Las contraseñas no coinciden' });
    }

    try {
        const contraseñaHaseada = await bcrypt.hash(contraseña1, 10);
        await pool.query("UPDATE empleados SET contrasenas=?, usuarios=? WHERE usuarios=?", [contraseñaHaseada, nuevoUsuario, ingresoUsuario]);

        const [usuario] = await pool.query("SELECT uuid FROM empleados WHERE usuarios=?", [nuevoUsuario]);
        
        if (!usuario.length) {
            return res.status(404).json({ err: 'Usuario no encontrado' });
        }  
         const [email] = await pool.query("SELECT email FROM empleados WHERE usuarios=?",[nuevoUsuario]) 
         
         const tokenRecuperacion=jwt.sign({email:email[0]}, process.env.JTW_RECUPERACION_MAIL,{expiresIn: '1h'})

          


         const vadidarRecuperacion= await validarReenvio(tokenRecuperacion,email[0].email) 



        const token = jwt.sign({ id: usuario.uuid, usuarios: ingresoUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        await pool.query("UPDATE empleados SET token=? WHERE uuid=?", [token, usuario[0].uuid]);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hora en milisegundos
        });

        res.status(200).json({ ok: true, token });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error.message);
        res.status(500).json({ err: 'Error al actualizar la contraseña' });
    }
});




app.delete("/eliminar-user", async (req, res) => {
    const {usuarioDelete, passwordDelete } = req.query; 

    let eliminarUsuario=usuarioDelete 
    let eliminarPass=passwordDelete
    console.log(eliminarUsuario,eliminarPass)
    try{ 
        const [user] = await pool.query("SELECT usuarios, contrasenas, email FROM empleados WHERE usuarios=?", [eliminarUsuario]);
           console.log(user)
        // Si el usuario no existe
        if (user.length === 0) {
            return res.status(404).json({ err: 'No se encontró el usuario' });
        }
    
        // Accede a la contraseña del usuario
        const passWordEliminar = user[0].contrasenas; 
        console.log(passWordEliminar)
       
    
        // Verifica la contraseña
        const verificacion = await bcrypt.compare(eliminarPass, passWordEliminar);  // Cambié bcrypt.verify() por bcrypt.compare()

        // Si la contraseña no es válida
        if (!verificacion) {
            return res.status(404).json({ err: 'La contraseña no coincide' });
        } 
    
         const email= user[0].email 
       
    
         const Token = jwt.sign({ email }, process.env.JTW_BORRADO, { expiresIn: "1h" }); 
       
  
          await emailBorrado(Token,email) 

         res.status(200).json({res:"respuesta exictosa"})

    }   
    
    catch(err){
              res.status(500).json({err:'ocurrio un error'})
    }


  
});


app.get("/ruta-reenvio/:token",async( req,res)=>{ 
    
    try{ 
        const token=req.params.token  

        if(!token) return res.status(400).send('hubo un error en la autenticacion')  

       const verificacion=jwt.verify(token,process.env.JTW_RECUPERACION_MAIL) 

       
     
         res.redirect('http://localhost:7000/pages.html')  

    } 

    catch(err){
        res.status(500).json({message:'hubo un error en la base de datos',err})
    }


})

// Ruta protegida de ejemplo
app.get('/ruta-protegida', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso a la ruta protegida concedido' });
}); 


 app.get("/ruta-eliminacion/:Token",queryDelete)


app.listen(port, () => { 
    console.log(`Se está escuchando el puerto ${port}`);
});



