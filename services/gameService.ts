import { Knex } from "knex";
// import { arrayBuffer } from "stream/consumers";
// import { isLogin } from "../util/middlewares";
// import { checkPassword, hashPassword } from "../util/hash";

export class gameService{
    constructor(private knex:Knex){}
    // Select
    // Get leaderBoard data
    gameRanking = async () => {
        let result = await this.knex.raw(`
        SELECT player_id, min(racetime) FROM leaderboard GROUP BY player_id ORDER BY min(racetime) LIMIT 10 `)
        if (result.length > 0){
            // console.log(result)
            return result;
        }else{
            return false;
        }
    };

    // Get owned car data
    gameShowCar = async (usersID: number) => {
        let resultOwnedCar = await this.knex.select('car_id').from('users_car').where('users_id', usersID);
        const carArray: object[] = [];
        for (let i = 0; i < resultOwnedCar.length; i++) {
            let resultOwnedCarInt = parseInt(resultOwnedCar[i].car_id);
            // let result = await this.knex.select('*').from('car').where('id', resultOwnedCarInt);
            let result = await this.knex.select('id', 'model', 'color').from('car').where('id', resultOwnedCarInt);
            carArray.push(result);
            console.log(result);
        }
        console.log('Owned car arr: ', JSON.stringify(carArray));
        return carArray
        // let result = 
        // let jsonData = {
        //     'id': carArray[1][0].id,
        //     'model': carArray[1][0].model,
        //     'color': carArray[1][0].color,
            
        // };
        // if (carArray.length > 0) {
        //     return jsonData;
        // } else {
        //     return false;
        // }
    }

    // Insert
    // Create a new car
    gameCreateCar = async (model: string, color: string,  email: string, usersID: number) => {

        // Identify car owner
        let result: string[] = await this.knex.select('email').from('users').where('email', email)
        
        // Identify current car number (max 5 cars)
        let currentCar: number[] = await this.knex.select('car_id').from('users_car').where('users_id', usersID)
        if (result.length == 1) {
            if (currentCar.length < 5) {
                // Insert created car
                await this.knex("car").insert({ model: model, color: color})
                let getCarID = await this.knex.select('id').from('car').orderBy('id', "desc").first()
                // Get latest car ID
                let carID = parseInt(getCarID.id)
                let jsonData = {
                        "users_id": usersID,
                        "car_id": carID,

                };
                // Insert users & car relationship
                await this.knex("users_car").insert({ users_id: usersID, car_id: carID})
                return jsonData;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}