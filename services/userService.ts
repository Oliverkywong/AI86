import { Knex } from "knex";
import { checkPassword, hashPassword } from "../util/hash";
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
        let result = await this.knex.select('email').from('users').where('email', email)
        let id = await this.knex.select('player_id').from('users').orderBy('player_id','desc').limit(1)
        let genid = parseInt(id[0]['player_id'])+1
        if (result.length ==0){
            await this.knex("users").insert({ player_id: genid, name: name, email: email, password: pwd})
            return true;
        }else{
            return false;
        }
    }
}