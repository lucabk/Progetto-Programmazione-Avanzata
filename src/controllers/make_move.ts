import { NextFunction, Request, Response } from 'express';
import { newMoveEntry, BoardObjInterface } from "../utils/type";
import { StatusCodes } from 'http-status-codes';
import { play } from '../game/play';
import { ErrorMsg } from '../utils/errorFactory';
import { EnglishDraughtsGame } from 'rapid-draughts/english';
import { isErrorMsg } from '../utils/type';

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
        //...deafult res (JSON)
        res.status(StatusCodes.CREATED).json({ "board 1D array":result.board })

    }catch(err){
        next(err)
    }

}