import { Knex } from "knex";
import { checkPassword, hashPassword } from "../util/hash";
// import {knex} from "../util/middlewares";

export class userService{
    constructor(private knex:Knex){}

    userLogin = async (email:string, password:string) => {
        let result = await this.knex.select('player_id','name','email','password').from('users').where('email', email)
        if( result.length == 0 ){
            return 1;
        }else {
            if (await checkPassword(password, result[0]["password"])){
                return result;
            }else{
                return 2;
            }
        }
    }

    userRegister = async (name:string, email:string, password:string) => {
        let pwd = await hashPassword(password)
        let id = await this.knex.select('player_id').from('users').orderBy('player_id','desc').limit(1)
        let genid = parseInt(id[0]['player_id'])+1
        console.log(genid,pwd)
        let result = await this.knex.select('email').from('users').where('email', email)
        console.log(result)
        if (result.length ==0){
            // this.knex("users").insert({ player_id: genid, name: name, email: email, password: pwd})
            this.knex.insert({ player_id: genid, name: name, email: email, password: pwd}).into("users")
            // this.knex.insert({ genid, name, email, pwd}).into("users")
            console.log("result")
            return true;
        }else{
            return false;
        }
    }
}