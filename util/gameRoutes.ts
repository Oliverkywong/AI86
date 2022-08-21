import express from 'express'
import { knex } from './middlewares'
import { gameService } from '../services/gameService'
import { gameController } from '../controllers/gameController'

export const gameRoutes = express.Router()

gameRoutes.use(express.json())

const GameResult = new gameService(knex)
export const GameController = new gameController(GameResult)

// Get ranking
gameRoutes.get('/ranking', GameController.ranking)
// Get owned car
gameRoutes.get('/car', GameController.showCar)
// Get selected car
gameRoutes.get('/selectedCar', GameController.selectedCar)
// Create car
gameRoutes.post('/car', GameController.createCar)
// Select car
gameRoutes.post('/selectCar', GameController.selectCar)

gameRoutes.post('/leaderboard', GameController.inputranking)

gameRoutes.get('/traincar', GameController.getaicar);

gameRoutes.post('/traincar', GameController.saveaicar)

