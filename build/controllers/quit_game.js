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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quitGame = void 0;
const game_1 = __importDefault(require("../models/game"));
const type_1 = require("../utils/type");
const models_1 = require("../models");
const http_status_codes_1 = require("http-status-codes");
const type_2 = require("../utils/type");
const quitGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //update game status ('games' table)
    const newGameStatus = type_2.GameStatus.QUITTED;
    const gameId = req.body.gameId;
    //update game status
    yield game_1.default.update({ status: newGameStatus }, {
        where: {
            id: gameId
        }
    });
    //update points ('users' table)
    const userId = req.user.id;
    yield models_1.User.decrement({ points: type_1.POINTS_QUIT_PENALTY }, { where: { id: userId } });
    //check update
    const userUpdated = yield models_1.User.findByPk(userId, {
        attributes: ['username', 'points']
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: `user ${req.user.username} has left the game`,
        user: userUpdated
    });
});
exports.quitGame = quitGame;
