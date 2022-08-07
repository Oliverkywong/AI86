jest.mock('../util/hash')
import { checkPassword } from '../util/hash'
jest.mock('knex');
import Knex from "knex";
jest.mock('../services/userService')
import { userService } from "../services/userService";

describe('userController', () => {
    // let usercontroller: userController
    // let req:Request;
    // let res:Response;
    // const service = new userService({Knex} as any)
    // usercontroller = new userController(service);

    it('should response with email incorrect', async () => {
        const fakeUser = {
            player_id: 1001,
            name: "test",
            email: "test@example.com",
            password: "abcd"
          }
        const service = new userService({
            knex: jest.fn(),
            select: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis()
        } as any);
        (checkPassword as any).mockReturnValue(true)
        
        const mKnex = jest.fn().mockReturnValue(service);
        (Knex as any).mockReturnValue(mKnex);
        service.userLogin = jest.fn().mockReturnValue([fakeUser]);
        // service.userLogin = jest.spyOn(mKnex);
        const user = await service.userLogin("test", "1234")
    //    await usercontroller.login(req, res);
       expect(user).toBeCalledTimes(1); 
    })
})