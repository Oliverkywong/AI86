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

// Get ranking
gameRoutes.post('/game/ranking', GameController.ranking)
// Get owned car
gameRoutes.post('/game/showCar', GameController.showCar)
// Create car
gameRoutes.post('/game/createCar', GameController.createCar)


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
  try {
    res.send(await fs.promises.readFile(file, 'utf8'));
  } catch (err) {
    logger.error(err)
    res.status(500).json('Internal Server Error')
  }
});

gameRoutes.post('/traincar', async (req, res) => {
  try {
    // let bestAI = JSON.parse(await fs.promises.readFile(file, 'utf8'));

    // if (bestAI.length != 0) {
    //   for (let i = 0; i < bestAI.length; i++) {
    //     console.log(req.body[0], bestAI[i][0])
    //     if (req.body[0] == bestAI[i][0]) {
    //       bestAI.splice(i, 1)
    //       bestAI.push(req.body);
    //       await fs.promises.writeFile(file, JSON.stringify(bestAI));
    //     } else {
    //       bestAI.push(req.body);
    //       await fs.promises.writeFile(file, JSON.stringify(bestAI));
    //       i=bestAI.length
    //     }
    //   }
    // } else {
    //   bestAI.push(req.body);
    //   await fs.promises.writeFile(file, JSON.stringify(bestAI));
    // }
    let bestAI = JSON.parse(await fs.promises.readFile(file, 'utf8'));

    if (bestAI.length != 0) {
      for (const ai of bestAI) {
        if (ai[0] == req.body[0]) {
          bestAI.splice(bestAI.indexOf(ai), 1, req.body)
          await fs.promises.writeFile(file, JSON.stringify(bestAI));
          return
        } else {
          bestAI.push(req.body)
          await fs.promises.writeFile(file, JSON.stringify(bestAI));
          return
        }
      }
    } else {
      bestAI.push(req.body);
      await fs.promises.writeFile(file, JSON.stringify(bestAI));
    }
  } catch (err) {
    logger.error(err)
    res.status(500).json('Internal Server Error')
  }
})

// gameRoutes.post('/leaderboard', async (req, res) => {
//   try {
//     let time = req.body.time
//     let playerid = req.session['player_id']
//     await knex.insert({ playerID: playerid, car_id: 0, racetime: time, map: 'map'}).into("leaderboard")
//     res.json({ register: true, result: ['register success'] })
//   } catch (err) {
//     logger.error(err)
//     res.status(500).json('Internal Server Error')
//   }
// })
