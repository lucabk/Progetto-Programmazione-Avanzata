import { Request, Response } from 'express';
import { newQuitEntry } from '../utils/type';
import Game from '../models/game';
import { POINTS_QUIT_PENALTY } from '../utils/type';
import { User } from '../models';
import { StatusCodes } from 'http-status-codes';
import { GameStatus } from '../utils/type';


export const quitGame = async (req:Request<unknown, unknown, newQuitEntry>, res:Response) => {

    //update game status ('games' table)
    const newGameStatus = GameStatus.QUITTED
    const gameId:number = req.body.gameId
    
    
    
    await Game.update(
        { status: newGameStatus },
        {
            where: {
                id:gameId
            }
        }
    )

    //update points ('users' table)
    const userId:number = req.user.id
    await User.decrement({ points:POINTS_QUIT_PENALTY }, { where: { id: userId }})

    //check update
    const userUpdated = await User.findByPk(userId, {
        attributes: ['username', 'points']
    })
    res.status(StatusCodes.OK).json({ 
        message: `user ${req.user.username} has left the game`,
        user : userUpdated
    })
}