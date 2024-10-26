import express from 'express'
import * as middlewareCor from '../middleware/cor'
import * as makeMoveController from '../controllers/make_move'

const makeMoveRouter = express.Router()

//make a move
makeMoveRouter.post('/',
    middlewareCor.makeMove,
    makeMoveController.makeMove
)

export default makeMoveRouter