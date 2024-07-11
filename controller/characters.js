//  aqui va la logica anda a la base de datos
import {
    validateCharacters, 
    validatePartial
} from "../validators/charactersSchema.js";

import {CharacterModel} from "../model/characters.js";

// POO
export class Controller{
    //get
    static async getAllCharacters  (req, res) {
        const characters= await CharacterModel.getAll();
        characters?
        res
        .status(200)
        .json({info: {status:200, message:"ok"}, data: characters})

        :res
        .status(404)
        .json({info: {status:404, message:"ok"}});
    }

   
    //get
    static async searchByGender(req, res){
        const {gender} =req.query;
        const filterByGender =await CharacterModel.serchByGender(gender);
        if(!filterByGender){
            res.json({info:{status:404, messge: "No characters in that gender"}});
        }else{
            res.json({info:{status:200, message:"ok"}, data: filterByGender});
        }
    }

    //get
    static async searchById  (req, res) {
        const {charactersId} =req.params; 
        const character = await CharacterModel.searchById(charactersId);
       if (character){
            res.status(200).json({info: { status: 200, message: "ok" }, data: character});
        }else{
            res.status(404).json({info: { status: 404, message: "Character not found"}});
    }
    }
     //delete
     static async deleteByeId (req, res) {
        
        const {charactersId} = req.params;
        const info=  await CharacterModel.deleteByeId(charactersId)
        if(info>0){
            res.status(200)
            .json({info: { status:200, message: "Character deleted"}});
        
        }else{
            res.status(404)
            .json({info: { status:404, message: "Character not found"}});
        }
    }
   

    //post
    static async createCharacter (req, res) {
        const{name, status, species, gender, origin}=req.body
        console.log(req.file)
        const validationResult= validateCharacters({
            name, 
            status, 
            species, 
            gender, 
            origin}
        );
        if (validationResult.error){
            res.status(422).json({
                info: {status: 422, message: "Validation errors"},
                errors: validationResult.error.issues,
            });
        }
        const characterCreated =await CharacterModel.createOne({...validationResult.data});
        characterCreated ?
        res.status(201).json({info: { status: 201, message: "Character created ok" },
        data:  {...validationResult.data}})
        :
        res.status(500)
        .json ({info: { status: 500, message: "Internal Server Error" }})
    }

 
      //patch
      static async updateById (req, res) {
         const {charactersId}= req.params;
         const character= await CharacterModel.searchById(charactersId);
         if(character === null){
            return res
            .status(404)
            .json ({info: {status: 404, message: "Character not found"}});
         }

        const validationResult= validatePartial(req.body)
        if (validationResult.error){
            return res.status(422).json({
                info: {status: 422, message: "Validation errors"},
                errors: validationResult.error.issues,
            });
        }
        const update= await CharacterModel.updateById(charactersId,validationResult.data );
        update?
        res. status (200)
        .json({info:{ status: 200, message: "characters update"}})
        :
        res.status(500).json({info:{ status: 500, message: "internal server error"}});
        }
       
}
