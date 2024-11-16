import express, { query } from "express"; 
import path from "path"; 
import cors from "cors"; 
import router from "./router/rutas.js";
import { fileURLToPath } from "url"; 




const app = express();  
const port = 7000;


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


app.use(express.static(path.join(__dirname, "../public")));  
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use('/',router)



app.listen(port, () => { 
    console.log(`Se está escuchando el puerto ${port}`);
});



