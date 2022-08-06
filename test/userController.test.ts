import Knex from "knex";
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
import { userService } from "../services/userService";

describe('userService', () => {
    afterAll((done) =>{
        knex.destroy();
        done();
    })
    it('should login', async () => {
        const userservice = new userService(knex);
        
        const user = await userservice.userLogin('abc@gmail.com', '0001')
        expect(user).toBe(user)
    });

    it('should not login with worng email&password', async()=>{
        const userservice = new userService(knex);
        
        const user = await userservice.userLogin('abc@gmail.co', '001')
        expect(user).toBeFalsy();
    })
    it('should not login with worng email', async()=>{
        const userservice = new userService(knex);
        
        const user = await userservice.userLogin('abc@gmail.co', '0001')
        expect(user).toBeFalsy();
    })

    it('should not login with worng password', async()=>{
        const userservice = new userService(knex);

        const user = await userservice.userLogin('abc@gmail.com', '1111')
        expect(user).toBeFalsy();
    })
})