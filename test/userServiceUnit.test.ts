
import { userService } from "../services/userService";

jest.mock('../util/hash')
import { checkPassword } from '../util/hash'

describe('userService Unit test login', () => {
    let userservice: userService;
    const fakeUser = {
      player_id: 1001,
      name: "test",
      email: "test@example.com",
      password: "abcd"
    }
    beforeAll(() => {
        userservice = new userService({
            knex: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnValue([fakeUser])
        } as any);
    });

    afterEach(() => {
        (checkPassword as any).mockReset();
    })

    it('should login', async () => {
        (checkPassword as any).mockReturnValue(true)
        const login = await userservice.userLogin('test@example.com', '0001')
        expect(login).toEqual([fakeUser])
    });

    it('should not login with worng email', async()=>{
        const login = await userservice.userLogin('abc@gmail.co', '0001')
        expect(login).toEqual(2)
    })

    it('should not login with worng password', async()=>{
        (checkPassword as any).mockReturnValue(false)
        const login = await userservice.userLogin('test@example.com', '1111')
        expect(login).toBe(2);
    })
})

describe('userService Unit test register', () => {
    let userservice: userService;
    const fakeUser = {
      player_id: 1001,
      name: "test",
      email: "test@example.com",
      password: "abcd"
    }
    beforeAll(() => {

    });

    it('should register', async () => {
        const knex=  {
            knex: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            from: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            insert: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnValue([fakeUser]),
        } as any
        userservice = new userService(knex);
        await userservice.userRegister('name', 'abc@example.com', '1111')
        expect(knex.select).toBeCalledTimes(2);
    })

    it('should not register', async () => {
        const register = await userservice.userRegister('name', 'test@example.com', '1111')
        expect(register).toBeFalsy();
    })
})



