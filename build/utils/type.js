"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newQuitSchema = exports.newRefillSchema = exports.newMoveSchema = exports.newGameSchema = exports.newUserSchema = exports.isErrorMsg = exports.GameStatus = exports.POINTS_QUIT_PENALTY = exports.POINTS_AFTER_WIN = exports.TOKEN_MOVE_COST = void 0;
const zod_1 = require("zod");
const models_1 = require("../models");
//Define the cost of a single move in tokens
exports.TOKEN_MOVE_COST = 0.0125;
//Define the points earned after a victory
exports.POINTS_AFTER_WIN = 1;
//Defines the points lost after the abandonment of a game
exports.POINTS_QUIT_PENALTY = 0.5;
//game status 
var GameStatus;
(function (GameStatus) {
    GameStatus["QUITTED"] = "quitted";
    GameStatus["IN_PROGRESS"] = "in_progress";
    GameStatus["WON"] = "won";
    GameStatus["LOST"] = "lost";
    GameStatus["DRAW"] = "draw";
})(GameStatus || (exports.GameStatus = GameStatus = {}));
//ErrorMsg type guard function
const isErrorMsg = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
        if ('statusCode' in obj && 'msg' in obj)
            return obj && typeof obj.statusCode === 'number' && typeof obj.msg === 'string';
    }
    return false;
};
exports.isErrorMsg = isErrorMsg;
/************************************** */
//login user validation
exports.newUserSchema = zod_1.z.object({
    username: zod_1.z.string().email().min(1).max(255), //DataTypes.STRING=== VARCHAR(255)
    password: zod_1.z.string().min(8).max(255),
    tokens: zod_1.z.number().nonnegative().default(models_1.MIN_TOKEN),
    isAdmin: zod_1.z.boolean().default(false)
});
//create game validation
exports.newGameSchema = zod_1.z.object({
    difficulty: zod_1.z.number().nonnegative().max(10).int() //alpha-beta max depth
});
//make a move validation
exports.newMoveSchema = zod_1.z.object({
    origin: zod_1.z.number().nonnegative().int().min(0).max(31), //0-31 board black square
    destination: zod_1.z.number().nonnegative().int().min(0).max(31),
    gameId: zod_1.z.number().nonnegative().int()
});
//refill validation
exports.newRefillSchema = zod_1.z.object({
    username: zod_1.z.string().email().min(1).max(255),
    tokens: zod_1.z.number().nonnegative()
});
//quit game validation
exports.newQuitSchema = zod_1.z.object({
    gameId: zod_1.z.number().nonnegative().int()
});
