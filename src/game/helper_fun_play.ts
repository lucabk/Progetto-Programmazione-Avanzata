//play module helper functions:
import { Game } from "../models"
import { User } from "../models"
import { BoardObjInterface } from "../utils/type"
import { TOKEN_MOVE_COST, POINTS_AFTER_WIN  } from '../utils/type';
import { GameStatus } from '../utils/type';


//update db during the game
export const updateDb = async (newGameState:BoardObjInterface, gameId:number) => {
    await Game.update(
        { boardObj:newGameState },
        {
            where: {
                id:gameId
            }
        },
    )
}


//Update the game status in the database a the end
export const updateDbEndGame = async (status:GameStatus, gameId:number, newGameState:BoardObjInterface) => {
    await Game.update(
        { status, boardObj:newGameState },
        {
            where: {
                id:gameId
            }
        },
    )
    return status
}


//Subtract tokens for each user's move
export const subtractTokens = async (userId:number) => {
    await User.decrement({ tokens: TOKEN_MOVE_COST }, { where: { id: userId }})
}


//Add token for victory
export const addTokens = async (userId:number) => {
    await User.increment({ points: POINTS_AFTER_WIN },  { where: { id: userId }})
}