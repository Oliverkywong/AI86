import express from 'express'
import fs from 'fs'
import path from 'path'
import { knex } from './middlewares'
import { gameService } from '../services/gameService'
import { gameController } from '../controllers/gameController'

export const gameRoutes = express.Router()

gameRoutes.use(express.json())

const GameResult = new gameService(knex)
export const GameController = new gameController(GameResult)

gameRoutes.post('/game/ranking',GameController.ranking)

let name;
gameRoutes.use((req, res, next) => {
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