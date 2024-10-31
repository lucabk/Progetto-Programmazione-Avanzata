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
exports.createNewGame = void 0;
const new_game_1 = require("../game/new_game");
const http_status_codes_1 = require("http-status-codes");
const helper_fun_1 = require("../game/helper_fun");
const createNewGame = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const difficulty = req.body.difficulty;
        const id = req.user.id;
        //create new game
        const { draughts } = (0, new_game_1.createGame)();
        //initial game state
        const gameState = {
            data: draughts.engine.data,
            history: draughts.history
        };
        console.log('gameState:\n', gameState);
        //save game in db
        const game = yield (0, helper_fun_1.createNewGameDb)(id, difficulty, gameState);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ message: 'Game created successfully', gameId: game.id });
        console.log('New game created!\nBoard:\n', draughts.asciiBoard());
    }
    catch (err) {
        next(err);
    }
});
exports.createNewGame = createNewGame;
