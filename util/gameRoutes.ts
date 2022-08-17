import express from 'express'
import { knex } from './middlewares'
import { gameService } from '../services/gameService'
import { gameController } from '../controllers/gameController'

export const gameRoutes = express.Router()

gameRoutes.use(express.json())

const GameResult = new gameService(knex)
export const GameController = new gameController(GameResult)

// Get ranking
gameRoutes.get('/game/ranking', GameController.ranking)
// Get owned car
gameRoutes.get('/game/showCar', GameController.showCar)
// Create car
gameRoutes.post('/game/createCar', GameController.createCar)
// Select car
gameRoutes.post('/game/selectCar', GameController.selectCar)

gameRoutes.post('/leaderboard', GameController.inputranking)

gameRoutes.get('/traincar', GameController.getaicar);

gameRoutes.post('/traincar', GameController.saveaicar)

