import { NextFunction, Request, Response } from 'express';
import { newMoveEntry, BoardObjInterface } from "../utils/type";
import { StatusCodes } from 'http-status-codes';
import { play } from '../game/play';
import { ErrorMsg } from '../utils/errorFactory';
import { EnglishDraughtsGame } from 'rapid-draughts/english';
import { isErrorMsg } from '../utils/type';
//import { sequelize } from '../utils/db';

export const makeMove = async (req:Request<unknown, unknown, newMoveEntry>, res:Response, next:NextFunction) => {
  
    //move data
    const { origin, destination } = req.body

    // AI level
    const difficulty = req.game.aiLevel

    //Game and User id
    const gameId = req.game.id
    const userId = req.user.id
    
    //state of the game
    const gameState = req.game.boardObj as BoardObjInterface
    const { data, history } = gameState
    
    //console.log('data:\n',data)
    //console.log('history:\n', history)
    
    //Start a transaction from sequelize connection and save it into a variable
    //const transaction = await sequelize.transaction()

    try{
        //play the move (difficulty, gameState, move, game and user Ids)
        const result: string|ErrorMsg|EnglishDraughtsGame = await play(difficulty, data, history, origin, destination, gameId, userId)
        
        //move not allowed
        if(isErrorMsg(result)){
            console.error('move not allowed')
            next(result)
            return
        }
        //game ended
        else if (typeof(result) === 'string'){
            res.status(StatusCodes.CREATED).json({ "game result":result })
            console.log('game ended')
            return            
        }
        //still playing...
        //...query string
        else if (req.query.format === 'ascii'){
            res.status(StatusCodes.CREATED).send(result.asciiBoard())
            console.log('query string')
            return
        }
        
        // If the execution reaches this line, no errors were thrown: commit the transaction.
        //await transaction.commit();
        
        //...deafult res (JSON)
        res.status(StatusCodes.CREATED).json({ "board 1D array":result.board })

    }catch(err){
        // If the execution reaches this line, an error was thrown: rollback the transaction.
        //await transaction.rollback()
        next(err)
    }

}