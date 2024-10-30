import { NextFunction, Request, Response } from 'express';
import { newMoveEntry, BoardObjInterface } from "../utils/type";
import { StatusCodes } from 'http-status-codes';
import { play } from '../game/play';
import { ErrorMsg } from '../utils/errorFactory';
import { DraughtsBoard1D } from 'rapid-draughts/dist/core/game';


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
        //play the move (difficulty, gameState, move, game ad user Ids)
        const result: string|ErrorMsg|DraughtsBoard1D = await play(difficulty, data, history, origin, destination, gameId, userId)
        
        //check if the move is allowed
        if((result as ErrorMsg).msg && (result as ErrorMsg).statusCode){
            next(result)
            return
        }

        else if (typeof(result) === 'string'){
            res.status(StatusCodes.CREATED).json({ "game result":result })
            return            
        }
       
        res.status(StatusCodes.CREATED).json({ "board 1D array":result })

    }catch(err){
        next(err)
    }

}