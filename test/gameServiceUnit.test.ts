import Knex from 'knex';
const knexConfigs = require("../knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);
import { gameService } from '../services/gameService';

describe('gameService Unit test fs', () => {
    let gameservice: gameService;
    let name = 'test'
    let dir = 'test'
    beforeEach(() => {
        gameservice = new gameService(knex);
    })

    it('should get data', async () => {
        const data =  await gameservice.readaicar(name,dir);
        expect(data).toEqual("[]")
    })

    it('should not get data', async () => {
        name = 'test1'
        const data =  await gameservice.readaicar(name,dir);
        expect(data).toBe('File not found');
    })

    it('should write file', async () => {
        
    })
})