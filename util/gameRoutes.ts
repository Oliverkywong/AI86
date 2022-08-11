import express from 'express'
import fs from 'fs'
import path from 'path'
import { knex } from './middlewares'
import { gameService } from '../services/gameService'
import { gameController } from '../controllers/gameController'
import { logger } from './logger'

export const gameRoutes = express.Router()

gameRoutes.use(express.json())

const GameResult = new gameService(knex)
export const GameController = new gameController(GameResult)

gameRoutes.post('/game/ranking',GameController.ranking)

let name;
let playerid:number;
gameRoutes.use((req, res, next) => {
    playerid = req.session['player_id']
    name = req.session['name']
    next();
})

const uploadDir = 'trainAI'
const file = path.join(uploadDir, `${name}.json`)
// const file = path.join(uploadDir, `bestAI.json`)
fs.mkdirSync(uploadDir, { recursive: true })
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, '[]')
}

gameRoutes.get('/traincar', async (req, res) => {
    res.send(await fs.promises.readFile(file, 'utf8'));
  });
  
gameRoutes.post('/traincar', async(req, res) => {
    let bestAI = JSON.parse(await fs.promises.readFile(file, 'utf8'));
    bestAI.push(req.body);
    await fs.promises.writeFile(file, JSON.stringify(bestAI));
  })

  gameRoutes.post('/leaderboard', async(req, res) => {
	try {
    let time = JSON.parse(req.body)
    console.log(playerid, time )
		// await knex.insert({ playerID: playerid, car_id: 0, racetime: time, map: 'map'}).into("leaderboard")
		// res.json({ register: true, result: ['register success'] })
	} catch (err) {
		logger.error(err)
		res.status(500).json('Internal Server Error')
	}
  })