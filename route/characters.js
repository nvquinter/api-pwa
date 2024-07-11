// aqui van las rutas
import {Router} from "express"
export const router = Router()// invoco el enrutador de express
import {Controller} from "../controller/characters.js";// importo archivo controller 
// import{upload} from"../multer.js";

// Rutas CRUD

// Obtener todos los elementos
router.get('/', Controller.getAllCharacters);

// Crear un nuevo elemento 
router.post('/', Controller.createCharacter);

router.get('/search', Controller.searchByGender);

// Obtener un elemento por ID
router.get('/:charactersId', Controller.searchById);

// Actualizar un elemento existente
router.patch('/:charactersId', Controller.updateById);

// Eliminar un elemento
router.delete('/:charactersId', Controller.deleteByeId );



