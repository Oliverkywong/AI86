import Knex from "knex";
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
import { userService } from "../services/userService";

const userservice = new userService(knex);

describe('userService', () => {
    // beforeAll(() => {
    //     const userservice = new userService(knex);
    // });
    afterAll((done) =>{
        knex.destroy();
        done();
    })
    it('should login', async () => {
        // const userservice = new userService(knex);
        
        const login = await userservice.userLogin('abc@gmail.com', '0001')
        expect(login).toBe(login)
    });

    it('should not login with worng email', async()=>{
        // const userservice = new userService(knex);
        
        const login = await userservice.userLogin('abc@gmail.co', '0001')
        expect(login).toBe(1);
    })

    it('should not login with worng password', async()=>{
        // const userservice = new userService(knex);

        const login = await userservice.userLogin('abc@gmail.com', '1111')
        expect(login).toBe(2);
    })

    it('should register', async () => {
        const register = await userservice.userRegister('name', 'abc@example.com', '1111')
        expect(register).toBeTruthy();
    })

    it('should not register', async () => {
        const register = await userservice.userRegister('name', 'abc@gmail.com', '1111')
        expect(register).toBeFalsy();
    })

})
