import { Knex } from "knex";
// import { checkPassword, hashPassword } from "../util/hash";

export class gameService{
    constructor(private knex:Knex){}
    // Select
    gameRanking = async () => {
        let result = await this.knex.select('*').from('leaderboard').orderBy('racetime')
        if (result.length > 0){
            return result;
        }else{
            return false;
        }
    };
    // gameCarStyle = async () => {
    //     let result = await this.knex.select('*').from('')
    // };    

    // Insert
    createCar = async (model: string, color: string) => {
        await this.knex("car").insert({ model: model, color: color})
    }

}