import { Request, Response } from 'express';
import { BoardObjInterface } from '../utils/type';

export const getHistory = (req:Request, res:Response) => {
    const gameState = req.game.boardObj as BoardObjInterface
    const moves = gameState.history.moves
    
    console.log('Move history:\n',moves)
    res.json({ moves })
}