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
exports.makeMove = void 0;
const http_status_codes_1 = require("http-status-codes");
const play_1 = require("../game/play");
const type_1 = require("../utils/type");
//import { sequelize } from '../utils/db';
const makeMove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //move data
    const { origin, destination } = req.body;
    // AI level
    const difficulty = req.game.aiLevel;
    //Game and User id
    const gameId = req.game.id;
    const userId = req.user.id;
    //state of the game
    const gameState = req.game.boardObj;
    const { data, history } = gameState;
    //console.log('data:\n',data)
    //console.log('history:\n', history)
    //Start a transaction from sequelize connection and save it into a variable
    //const transaction = await sequelize.transaction()
    try {
        //play the move (difficulty, gameState, move, game and user Ids)
        const result = yield (0, play_1.play)(difficulty, data, history, origin, destination, gameId, userId);
        //move not allowed
        if ((0, type_1.isErrorMsg)(result)) {
            console.error('move not allowed');
            next(result);
            return;
        }
        //game ended
        else if (typeof (result) === 'string') {
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ "game result": result });
            console.log('game ended');
            return;
        }
        //still playing...
        //...query string
        else if (req.query.format === 'ascii') {
            res.status(http_status_codes_1.StatusCodes.CREATED).send(result.asciiBoard());
            console.log('query string');
            return;
        }
        // If the execution reaches this line, no errors were thrown: commit the transaction.
        //await transaction.commit();
        //...deafult res (JSON)
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ "board 1D array": result.board });
    }
    catch (err) {
        // If the execution reaches this line, an error was thrown: rollback the transaction.
        //await transaction.rollback()
        next(err);
    }
});
exports.makeMove = makeMove;
