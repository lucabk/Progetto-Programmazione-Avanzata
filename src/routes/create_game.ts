import express from 'express'
import * as middlewareCor from '../middleware/cor'


const createGameRouter = express.Router()

//create new game
createGameRouter.post('/', 
    middlewareCor.createGame
)

export default createGameRouter