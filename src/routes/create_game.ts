import express from 'express'
import * as middlewareCor from '../middleware/cor'
import * as createGameController from '../controllers/create_game'

const createGameRouter = express.Router()

//create new game
createGameRouter.post('/', 
    middlewareCor.createGame,
    createGameController.createNewGame
)

export default createGameRouter