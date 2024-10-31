"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.play = void 0;
const rapid_draughts_1 = require("rapid-draughts");
const english_1 = require("rapid-draughts/english");
const errorFactory_1 = require("../utils/errorFactory");
const http_status_codes_1 = require("http-status-codes");
const type_1 = require("../utils/type");
const helper_fun_1 = require("./helper_fun");
const play = (difficulty, data, history, origin, destination, gameId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Initialise the game
    const draughts = english_1.EnglishDraughts.setup(data, history);
    //Initialise computer player
    const ai = english_1.EnglishDraughtsComputerFactory.alphaBeta({
        maxDepth: difficulty,
    });
    console.log(`\n\nBoard Status before the move:\n${draughts.asciiBoard()}`);
    //Still playing
    while (draughts.status === rapid_draughts_1.DraughtsStatus.PLAYING) {
        //Display the available moves
        const { moves } = draughts;
        console.log('available moves:\n', moves);
        //Display User move
        console.log('Your move: -origin: ', origin, ' ; -destination:', destination);
        //check if the move is allowed
        const allowedMove = moves.find(move => move.origin === origin && move.destination === destination);
        if (!allowedMove) {
            const showAllowedMoves = moves.map(move => `(${move.origin},${move.destination})`).join(', ');
            const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.BAD_REQUEST, `move not allowed! Allowed moves (origin,destination): ${showAllowedMoves}`);
            return error;
        }
        //make the move
        draughts.move(allowedMove);
        /*After making a move, the draughts object will update the board, the current player, and the game status.
        It will also add the move to the game history. Keep in mind that the move() method does not validate if the
        move is legal. An error will be thrown if an illegal move is passed in.*/
        // subtract tokens for each user's move
        yield (0, helper_fun_1.subtractTokens)(userId);
        console.log(`\n\nBoard Status after user's move:\n${draughts.asciiBoard()}`);
        // if game is over
        if (draughts.status !== rapid_draughts_1.DraughtsStatus.PLAYING) {
            //User won
            if (draughts.status === rapid_draughts_1.DraughtsStatus.DARK_WON) {
                yield (0, helper_fun_1.addPoints)(userId);
                const newGameState = {
                    data: draughts.engine.data,
                    history: draughts.history
                };
                return (0, helper_fun_1.updateDbEndGame)(type_1.GameStatus.WON, gameId, newGameState);
            }
            //Tie
            else {
                const newGameState = {
                    data: draughts.engine.data,
                    history: draughts.history
                };
                return (0, helper_fun_1.updateDbEndGame)(type_1.GameStatus.DRAW, gameId, newGameState);
            }
        }
        //Check if it's the AI's turn
        if (draughts.player === rapid_draughts_1.DraughtsPlayer.LIGHT) {
            //Get the computer's move        
            const computerMove = yield ai(draughts);
            //If the computer has a move, execute it
            if (computerMove) {
                draughts.move(computerMove); //After making a move, the draughts object will update the board, the current player, and the game status. It will also add the move to the game history. 
                console.log('AI turn...\n');
                console.log(`\n\nBoard Status after AI's move:\n${draughts.asciiBoard()}`);
                //Game ended 
                if (draughts.status !== rapid_draughts_1.DraughtsStatus.PLAYING) {
                    //Computer won 
                    if (draughts.status === rapid_draughts_1.DraughtsStatus.LIGHT_WON) {
                        const newGameState = {
                            data: draughts.engine.data,
                            history: draughts.history
                        };
                        return (0, helper_fun_1.updateDbEndGame)(type_1.GameStatus.LOST, gameId, newGameState);
                    }
                    //Tie
                    else {
                        const newGameState = {
                            data: draughts.engine.data,
                            history: draughts.history
                        };
                        return (0, helper_fun_1.updateDbEndGame)(type_1.GameStatus.DRAW, gameId, newGameState);
                    }
                }
            }
        }
        //still playing...
        //update db
        const newGameState = {
            data: draughts.engine.data,
            history: draughts.history
        };
        yield (0, helper_fun_1.updateDb)(newGameState, gameId);
        //return draughts obj
        return draughts;
    }
    //this condition should never occur due to middleware 'checkStillPlaying'
    const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'game ended');
    return error;
});
exports.play = play;
