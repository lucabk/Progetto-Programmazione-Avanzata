import { newGameEntry } from "../utils/type";
import { NextFunction, Request, Response } from 'express';
import { createGame } from "../game/new_game";
import { StatusCodes } from "http-status-codes";
import { Game } from "../models";

export const createNewGame = async (req: Request<unknown, unknown, newGameEntry>, res:Response, next:NextFunction) => {
    try{
        const difficulty:number = req.body.difficulty
        const id:number = req.user.id

        //create new game
        const { draughts } = createGame()

        //initial game state
        const gameState = {
            data : draughts.engine.data,
            history: draughts.history
        }

        console.log('gameState:\n',gameState)

        //save game in db
        const game = await Game.create({
            userId:id,
            aiLevel:difficulty,
            boardObj:gameState
        })

        res.status(StatusCodes.CREATED).json({ message: 'Game created successfully', gameId: game.id })
        console.log('New game created!\nBoard:\n',draughts.asciiBoard());
        
        /*console.log('draughts:\n', draughts)
        console.log('********************************\n')
        console.log('draughts.board:\n',draughts.board)

        console.log('draughts.moves\n',draughts.moves)
        console.log('********************************\n')
        console.log('draughts.player\n',draughts.player)
        console.log('********************************\n')
        console.log('draughts.status\n',draughts.status)
        
        console.log('********************************\n')
        console.log('draughts.engine.data\n',draughts.engine.data)
        console.log('********************************\n')
        console.log('draughts.history\n',draughts.history)
        console.log('********************************\n')*/

    }catch(err){
        next(err)
    }
}