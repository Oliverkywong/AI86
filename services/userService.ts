import { Knex } from "knex";
import { checkPassword, hashPassword } from "../util/hash";

export class userService{
    constructor(private knex:Knex){}

    userLogin = async (user:string, password:string) => {
        let result = await this.knex.select('player_id','name','email','password').from('users').where('email', user)
        if( result.length == 0 ){
            return false;
        }else {
            if (await checkPassword(password, result[0]["password"])){
                return result;
            }else{
                return false;
            }
        }
    }

    userRegister = async (user:string, email:string, password:string) => {
        let pwd = await hashPassword(password)
        let id = await this.knex.select('player_id').from('users').orderBy('player_id','desc').limit(1)
        let genid = parseInt(id[0]['player_id'])+1
        
        let result = await this.knex.select('email',).from('users').where('email', email)
        if (result.length ==0){
            this.knex.insert({ player_id: genid, name: user, email: email, password: pwd}).into("users")
            return true;
        }else{
            return false;
        }
    }
}