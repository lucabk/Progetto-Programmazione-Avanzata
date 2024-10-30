import { newGameEntry } from "../utils/type";
import { NextFunction, Request, Response } from 'express';
import { createGame } from "../game/new_game";
import { StatusCodes } from "http-status-codes";
import { createNewGameDb } from "../game/helper_fun";


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
        const game = await createNewGameDb(id, difficulty, gameState)

        res.status(StatusCodes.CREATED).json({ message: 'Game created successfully', gameId: game.id })
        console.log('New game created!\nBoard:\n',draughts.asciiBoard());
        

    }catch(err){
        next(err)
    }
}