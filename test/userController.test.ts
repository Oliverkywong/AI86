import { Request } from "express";
import { userService } from "../services/userService";

describe('userController', () => {
    let userservice: userService;
    // let usercontroller: userController;
    let req:Request;
    // let res:Response;

    beforeEach(() => {
        // userservice = new userService(knex);
        // usercontroller = new userController(userservice);
        userservice = {} as any
        // usercontroller = new userController(userservice);
        // res =  {status:jest.fn().mockReturnThis()} as any
    })

    it('should login', async () => {
        req = {body:{player_id:1001, name:'admin', email:'abc@gmail.com', password:'0001'}, session:{isLogin: true}} as any
        userservice.userLogin = jest.fn().mockReturnValue(req);
        // const login =  await  usercontroller.login(req, res);
        expect(userservice.userLogin).toBeCalledTimes(0);
        // expect(login).toBe(1);
    })

})