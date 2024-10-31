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
exports.createNewGameDb = exports.addPoints = exports.subtractTokens = exports.updateDbEndGame = exports.updateDb = void 0;
//play module helper functions:
const models_1 = require("../models");
const models_2 = require("../models");
const type_1 = require("../utils/type");
//update db during the game
const updateDb = (newGameState, gameId) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Game.update({ boardObj: newGameState }, {
        where: {
            id: gameId
        }
    });
});
exports.updateDb = updateDb;
//Update the game status in the database a the end
const updateDbEndGame = (status, gameId, newGameState) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.Game.update({ status, boardObj: newGameState }, {
        where: {
            id: gameId
        }
    });
    return status;
});
exports.updateDbEndGame = updateDbEndGame;
//Subtract tokens for each user's move
const subtractTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_2.User.decrement({ tokens: type_1.TOKEN_MOVE_COST }, { where: { id: userId } });
});
exports.subtractTokens = subtractTokens;
//Add points for victory
const addPoints = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_2.User.increment({ points: type_1.POINTS_AFTER_WIN }, { where: { id: userId } });
});
exports.addPoints = addPoints;
//Save new game in the db
const createNewGameDb = (id, difficulty, gameState) => __awaiter(void 0, void 0, void 0, function* () {
    const game = yield models_1.Game.create({
        userId: id,
        aiLevel: difficulty,
        boardObj: gameState
    });
    return game;
});
exports.createNewGameDb = createNewGameDb;
