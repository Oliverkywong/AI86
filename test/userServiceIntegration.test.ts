import Knex from "knex";
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
import { userService } from "../services/userService";

describe('userService Integration test', () => {
    let userservice: userService;
    beforeEach(() => {
        userservice = new userService(knex);
    });
    afterAll((done) =>{
        knex.destroy();
        done();
    })
    it('should login', async () => {
        const fakeUser = {
            player_id: 1001,
            name: 'admin',
            email: 'abc@gmail.com',
            password: '$2a$10$Cfyya8V4ZabNWZBbibWAb.j8E0RLdLXbAQm4eaa.dDw5BQTwL851G'
          }
        const login = await userservice.userLogin('abc@gmail.com', '0001')
        expect(login).toEqual([fakeUser])
    });

    it('should not login with worng email', async()=>{
        const login = await userservice.userLogin('abc@gmail.co', '0001')
        expect(login).toBe(1);
    })

    it('should not login with worng password', async()=>{
        const login = await userservice.userLogin('abc@gmail.com', '1111')
        expect(login).toBe(2);
    })

    it('should register', async () => {
        const register = await userservice.userRegister('name', 'abc@example.com', '1111')
        await knex("users").del().where('email', 'abc@example.com');
        expect(register).toBeTruthy();
    })

    it('should not register', async () => {
        const register = await userservice.userRegister('name', 'abc@gmail.com', '1111')
        expect(register).toBeFalsy();
    })

})
