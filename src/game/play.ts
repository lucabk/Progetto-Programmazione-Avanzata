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
import { GameStatus } from '../utils/type';
import { updateDb, updateDbEndGame, subtractTokens, addPoints } from './helper_fun';
import { EnglishDraughtsGame } from 'rapid-draughts/english';

export const play = async (
    difficulty:number, 
    data:Partial<DraughtsEngineData<number, EnglishDraughtsEngineStore>>, 
    history:Partial<DraughtsGameHistory1D>, 
    origin:number, 
    destination:number,
    gameId:number,
    userId:number
        ):Promise<  EnglishDraughtsGame | ErrorMsg | string > => {

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
        //Display User move
        console.log('Your move: -origin: ', origin,' ; -destination:', destination)

        //check if the move is allowed
        const allowedMove = moves.find(move => move.origin === origin && move.destination === destination)
        if(!allowedMove){
            const showAllowedMoves = moves.map(move => `(${move.origin},${move.destination})`).join(', ')
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
        
        // if game is over
        if(draughts.status !== DraughtsStatus.PLAYING){
            //User won
            if(draughts.status === DraughtsStatus.DARK_WON){
                await addPoints(userId)

                const newGameState = {
                    data : draughts.engine.data,
                    history: draughts.history
                }
                return updateDbEndGame(GameStatus.WON, gameId, newGameState)
            }
            //Tie
            else{
                const newGameState = {
                    data : draughts.engine.data,
                    history: draughts.history
                }
                return updateDbEndGame(GameStatus.DRAW, gameId, newGameState)
            }
        }

        //Check if it's the AI's turn
        if (draughts.player === DraughtsPlayer.LIGHT) {
            //Get the computer's move        
            const computerMove  = await ai(draughts)
            //If the computer has a move, execute it
            if (computerMove) {
                draughts.move(computerMove); //After making a move, the draughts object will update the board, the current player, and the game status. It will also add the move to the game history. 
                console.log('AI turn...\n');
                console.log(`\n\nBoard Status after AI's move:\n${draughts.asciiBoard()}`)

                //Game ended 
                if (draughts.status !== DraughtsStatus.PLAYING){
                    //Computer won 
                    if (draughts.status === DraughtsStatus.LIGHT_WON){
                        const newGameState = {
                        data : draughts.engine.data,
                        history: draughts.history
                        }
                        return updateDbEndGame(GameStatus.LOST, gameId, newGameState)
                    }
                    //Tie
                    else{
                        const newGameState = {
                            data : draughts.engine.data,
                            history: draughts.history
                        }
                        return updateDbEndGame(GameStatus.DRAW, gameId, newGameState)
                    }
                }
            }
        }

        //still playing...
        //update db
        const newGameState = {
            data : draughts.engine.data,
            history: draughts.history
        }
        await updateDb(newGameState, gameId)
        
        //return draughts obj
        return draughts
    }

    //this condition should never occur due to middleware 'checkStillPlaying'
    const error:ErrorMsg = factory.getError(StatusCodes.INTERNAL_SERVER_ERROR,'game ended')
    return error
}