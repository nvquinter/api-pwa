import {db} from "../dbConnection.js";
// aca va la logica que va a la base de datos

export class CharacterModel{
    static async getAll(){
        //se pone entre corchete para que devuelva un solo arreglo
        const [characters, _info]= await db.query(
        `select id, name, status, species, gender, origin
        from characters`
        );
        return characters.length ? characters : null;
    }

    static async serchByGender(gender){
        const [characters, _info]= await db.query(
        `select id, name, status, species, gender, origin
        from characters
        where gender = ? `
        ,
        [gender]
        );
        return characters.length ? characters : null;
    }

    static async searchById(charactersId){
        const [character, _info] = await db.query(
        `select id, name, status, species, gender, origin
        from characters
        where id = ? `
        ,
        [charactersId]
        );
        return character.length ? character : null;
    }

    static async deleteByeId(charactersId){
        const [info] = await db.query(
        `DELETE FROM characters WHERE id= ?`,
        [charactersId]
        );
        return info.affectedRows;
    }

    static async createOne (character){
        const {name, status, species, gender, origin} =character;
        const [result, _info]= await db.query(
        `INSERT INTO characters (name, status, species, gender, origin) VALUES
        (?,?,?,?,?)`,
        [name, status, species, gender, origin]
        );
        return result ? result: null;
    }

    static async updateById(id, partialCharacter){
        let partialQuery= "";
        for (const Key in partialCharacter){
            partialQuery += `${Key} = '${partialCharacter[Key]}', `;
        }
        partialQuery=partialQuery.slice(0, -2);
        const [info]= await db.query(
        `UPDATE characters SET ${partialQuery} where id=?`,
        [id]
        );
        return info.affectedRows;
    }
}

