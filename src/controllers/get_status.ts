import { Request, Response } from 'express';
import { GameStatus } from '../utils/type';

export const getStatus = (req:Request, res:Response) => {
    const status:GameStatus = req.game.status

    console.log('Game status: ',status)
    res.json({ status })
}