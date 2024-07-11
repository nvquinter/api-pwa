import express from"express";
import {config} from "dotenv";
import cors from "cors";
import {router as charactersRouter} from "./route/characters.js";// aca importamos la carpeta router

const app = express();
 config();
// Middleware para permitir el uso de formato JSON
app.use(express.json());

//Middleware cors a nivel aplicacion-cruce de dominios
app.use(cors());

app.use(express.urlencoded({extended:true})); // permite recibir info de un formulario en formato objeto

app.use("/api/characters", charactersRouter );// aca usamos la const donde se ecuentra la carpeta router

const port=process.env.PORT || 4100;
app.listen(port,(err)=>{
    console.log (err ? err : `Server running on http://localhost:${port}`);
});

