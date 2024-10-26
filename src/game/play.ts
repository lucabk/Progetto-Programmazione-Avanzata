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


export const play = async (
    difficulty:number, 
    data:Partial<DraughtsEngineData<number, EnglishDraughtsEngineStore>>, 
    history:Partial<DraughtsGameHistory1D>, 
    origin:number, destination:number):Promise<string | ErrorMsg> => {

    // Initialise the game
    const draughts = Draughts.setup(data, history);

    //Initialise computer player
    const ai = ComputerFactory.alphaBeta({
        maxDepth: difficulty,
    });

    console.log(`\n\nBoard Status before the move:\n${draughts.asciiBoard()}`);
    
    if(draughts.status === DraughtsStatus.PLAYING){

        //Display the available moves
        const { moves } = draughts;
        console.log('available moves:\n', moves)

        console.log('origin: ', origin,' ; destination:', destination)

        //check if the move is allowed
        const allowedMove = moves.find(move => move.origin === origin && move.destination === destination)
        if(!allowedMove){
            const error:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'move not allowed!')
            return error
        }

        //make the move
        draughts.move(allowedMove)
        /*After making a move, the draughts object will update the board, the current player, and the game status. 
        It will also add the move to the game history. Keep in mind that the move() method does not validate if the 
        move is legal. An error will be thrown if an illegal move is passed in.*/

        console.log(`\n\nBoard Status after user move:\n${draughts.asciiBoard()}`);

        // Check if the game continues and if it's the AI's turn
        if (draughts.status === DraughtsStatus.PLAYING && draughts.player === DraughtsPlayer.LIGHT) {
            // Get the computer's move        
            const computerMove  = await ai(draughts)
            if (computerMove) {
                draughts.move(computerMove);
                console.log('AI moved...\n');
                console.log(`\n\nBoard Status after AI's move:\n${draughts.asciiBoard()}`);
            }
        }

        return draughts.asciiBoard()
    }

    return 'game ended! WIN|LOSE'
    /* Play with the AIs until there is a winner
    while (draughts.status === DraughtsStatus.PLAYING) {
    console.log(`${draughts.asciiBoard()}`);
    console.log(`to_move = ${draughts.player}`);

    const computerPlayer =
        draughts.player === DraughtsPlayer.LIGHT ? weakComputer : strongComputer;

    const move = await computerPlayer(draughts);
    if (move) draughts.move(move);
    }

    // Announce the winner
    console.log(`${draughts.asciiBoard()}`);
    console.log(`status = ${draughts.status}`);
    console.log(`ended after ${draughts.history.moves.length} moves`);*/
}
