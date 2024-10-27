import { Request, Response } from 'express';
import { gameStatus } from '../models/game';

export const getStatus = (req:Request, res:Response) => {
    const status:gameStatus = req.game.status

    console.log('Game status: ',status)
    res.json(status)
}