import { newGameEntry } from "../utils/type"; //req
import { NextFunction, Request, Response } from 'express';
import { createGame } from "../game/new_game";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { Game } from "../models";

export const createNewGame = async (req: Request<JwtPayload, unknown, newGameEntry>, res:Response, next:NextFunction) => {
    try{
        const difficulty:number = req.body.difficulty
        const id:number = req.user.id

        //create new game
        const { draughts } = createGame()

        //save game in db
        const game = await Game.create({
            userId:id,
            aiLevel:difficulty,
            boardObj:draughts
        })

        res.status(StatusCodes.CREATED).json({ message: 'Game created successfully', gameId: game.id})
        console.log('New game created!\n\n',draughts.asciiBoard());
        console.log('draughts:', draughts)
   

    }catch(err){
        next(err)
    }
}