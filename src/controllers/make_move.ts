import { NextFunction, Request, Response } from 'express';
import { newMoveSchema } from "../utils/type";
import { StatusCodes } from 'http-status-codes';
import { BoardObjInterface } from '../utils/type';
import { play } from '../game/play';
import { ErrorMsg } from '../utils/errorFactory';

export const makeMove = async (req:Request<unknown, unknown, newMoveSchema>, res:Response, next:NextFunction) => {
  
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
        //play the move
        const result: string|ErrorMsg = await play(difficulty, data, history, origin, destination, gameId, userId)
        
        //check if the move is allowed
        if(typeof(result) !== 'string'){
            next(result)
            return
        }
        res.status(StatusCodes.CREATED).send(result)

    }catch(err){
        next(err)
    }

}