import { Knex } from "knex";

export class gameService{
    constructor(private knex:Knex){}
    // Select
    // Get leaderBoard data
    gameRanking = async () => {
        let result = await this.knex.raw('SELECT player_id,map,car_id, min(racetime) as racetime FROM leaderboard GROUP BY player_id, map,car_id ORDER BY min(racetime) LIMIT 10 ')

        if (result.rows.length > 0){
            return result.rows;
        }else{
            return false;
        }
    };

    // Get owned car data
    gameShowCar = async (usersID: number) => {
        // Get all owned car
        let resultOwnedCar = await this.knex.select('car_id').from('users_car').where('users_id', usersID);
        const carArray: object[] = [];
        // Push all owned car into array and send to js
        for (let i = 0; i < resultOwnedCar.length; i++) {
            let resultOwnedCarInt = parseInt(resultOwnedCar[i].car_id);
            let result = await this.knex.select('id', 'model', 'color').from('car').where('id', resultOwnedCarInt);
            carArray.push(result);        
        }
        // console.log('Owned car arr: ', JSON.stringify(carArray));
        return carArray
    }

    // Insert
    // Create a new car
    gameCreateCar = async (model: string, color: string,  email: string, usersID: number) => {

        // Identify car owner
        let result: string[] = await this.knex.select('email').from('users').where('email', email)
        console.log("car owner", result);
        // Identify current car number (max 5 cars)
        
        let currentCar: number[] = await this.knex.select('car_id').from('users_car').where('users_id', usersID)
        console.log("What I have now", currentCar);
        console.log("current car.length", currentCar.length)
        if (result.length == 1) {
            if (currentCar.length < 5) {
                // Insert created car
                await this.knex("car").insert({ model: model, color: color})
                let getCarID = await this.knex.select('id').from('car').orderBy('id', "desc").first()
                console.log(getCarID)
                // Get latest car ID
                let carID = parseInt(getCarID.id)
                // Insert users & car relationship
                await this.knex("users_car").insert({ users_id: usersID, car_id: carID})
                // return jsonData;
                return result
            } else {
                console.log('You cannot own more car!!')
                return false;
            }
        } else {
            return false;
        }
    }

    gameSelectCar = async(carID: number) => {

    }

}