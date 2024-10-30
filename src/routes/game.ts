import express from "express";
import * as middlewareCor from '../middleware/cor'
import * as getHistotyController from '../controllers/get_history'
import * as getStatusController from '../controllers/get_status'
import * as createGameController from '../controllers/create_game'
import * as makeMoveController from '../controllers/make_move'
import * as quitGameController from '../controllers/quit_game'

/*Assumptions: 
    - each user can only see their own moves and match status
    - you cannot leave the game if you do not have tokens
*/

const gameRouter = express.Router()

//create new game
gameRouter.post('/', 
    middlewareCor.createGame,
    createGameController.createNewGame
)

//make a move
gameRouter.post('/play',
    middlewareCor.makeMove,
    makeMoveController.makeMove
)

//get history
gameRouter.get('/history/:id',
    middlewareCor.getHistory,
    getHistotyController.getHistory
)

//quit game
gameRouter.put('/quit',
    middlewareCor.quitGame,
    quitGameController.quitGame
)

//get game status
gameRouter.get('/status/:id',
    middlewareCor.getStatus,
    getStatusController.getStatus
)

export default gameRouter