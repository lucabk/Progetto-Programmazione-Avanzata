import { DraughtsStatus, DraughtsPlayer } from 'rapid-draughts';
import {
EnglishDraughts as Draughts,
EnglishDraughtsComputerFactory as ComputerFactory,
} from 'rapid-draughts/english';
import { DraughtsEngineData } from 'rapid-draughts/dist/core/engine';
import { EnglishDraughtsEngineStore } from 'rapid-draughts/dist/english/engine';
import { DraughtsGameHistory1D } from 'rapid-draughts/dist/core/game';
import { ErrorMsg, factory } from '../utils/errorFactory';
import { StatusCodes } from 'http-status-codes';
import Game, { gameStatus } from '../models/game';
import { BoardObjInterface } from '../utils/type';
import { User } from '../models';


//Define the cost of a single move in tokens
const TOKEN_MOVE_COST:number = 0.0125 
//Define the points earned after a victory
const POINTS_AFTER_WIN:number = 1

export const play = async (
    difficulty:number, 
    data:Partial<DraughtsEngineData<number, EnglishDraughtsEngineStore>>, 
    history:Partial<DraughtsGameHistory1D>, 
    origin:number, destination:number,
    gameId:number,
    userId:number
        ):Promise<string | ErrorMsg> => {

    // Initialise the game
    const draughts = Draughts.setup(data, history);

    //Initialise computer player
    const ai = ComputerFactory.alphaBeta({
        maxDepth: difficulty,
    });

    console.log(`\n\nBoard Status before the move:\n${draughts.asciiBoard()}`);
    
    //Still playing
    while(draughts.status === DraughtsStatus.PLAYING){

        //Display the available moves
        const { moves } = draughts;
        console.log('available moves:\n', moves)

        console.log('Your move: -origin: ', origin,' ; -destination:', destination)

        //check if the move is allowed
        const allowedMove = moves.find(move => move.origin === origin && move.destination === destination)
        if(!allowedMove){
            const showAllowedMoves = moves.map(move => `(${move.origin},${move.destination})`).join(', ')
            console.error('move not allowed!')
            const error:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, `move not allowed! Allowed moves (origin,destination): ${showAllowedMoves}`)
            return error
        }

        //make the move
        draughts.move(allowedMove)
        /*After making a move, the draughts object will update the board, the current player, and the game status. 
        It will also add the move to the game history. Keep in mind that the move() method does not validate if the 
        move is legal. An error will be thrown if an illegal move is passed in.*/

        // subtract tokens for each user's move
        await subtractTokens(userId)

        console.log(`\n\nBoard Status after user's move:\n${draughts.asciiBoard()}`);
        

        //Check if the game continues and if it's the AI's turn
        if (draughts.status === DraughtsStatus.PLAYING && draughts.player === DraughtsPlayer.LIGHT) {
            //Get the computer's move        
            const computerMove  = await ai(draughts)
            //If the computer has a move, execute it
            if (computerMove) {
                draughts.move(computerMove);
                console.log('AI moved...\n');
                console.log(`\n\nBoard Status after AI's move:\n${draughts.asciiBoard()}`)
            }
        }

        //game finished
        else
            break

        //update db
        const newGameState = {
            data : draughts.engine.data,
            history: draughts.history
        }
        await updateDb(newGameState, gameId)
        
        //return the board
        return draughts.asciiBoard()
    }

    //Computer won
    if(draughts.status === DraughtsStatus.LIGHT_WON){
        const newGameState = {
            data : draughts.engine.data,
            history: draughts.history
        }
        return updateDbEndGame('lost', gameId, newGameState)
    }

    //User won
    if(draughts.status === DraughtsStatus.DARK_WON){
        await addTokens(userId)

        const newGameState = {
            data : draughts.engine.data,
            history: draughts.history
        }
        return updateDbEndGame('won', gameId, newGameState)
    }

    //Tie
    else{
        const newGameState = {
            data : draughts.engine.data,
            history: draughts.history
        }
        return updateDbEndGame('draw', gameId, newGameState)
    }

    
    /* 
    // Announce the winner
    console.log(`${draughts.asciiBoard()}`);
    console.log(`status = ${draughts.status}`);
    console.log(`ended after ${draughts.history.moves.length} moves`);*/
}



//update db during the game
const updateDb = async (newGameState:BoardObjInterface, gameId:number) => {
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
const updateDbEndGame = async (status:gameStatus, gameId:number, newGameState:BoardObjInterface) => {
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
const subtractTokens = async (userId:number) => {
    await User.decrement({ tokens: TOKEN_MOVE_COST }, { where: { id: userId }})
}


//Add token for victory
const addTokens = async (userId:number) => {
    await User.increment({ points: POINTS_AFTER_WIN },  { where: { id: userId }})
}