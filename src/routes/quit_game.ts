import express from 'express'
import * as middlewareCor from '../middleware/cor'
import * as quitGameController from '../controllers/quit_game'

const quitGameRouter = express.Router()

//Assumption: you cannot leave the game if you do not have tokens

//quit game
quitGameRouter.put('/',
    middlewareCor.quitGame,
    quitGameController.quitGame
)

export default quitGameRouter