"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewareCor = __importStar(require("../middleware/cor"));
const getHistotyController = __importStar(require("../controllers/get_history"));
const getStatusController = __importStar(require("../controllers/get_status"));
const createGameController = __importStar(require("../controllers/create_game"));
const makeMoveController = __importStar(require("../controllers/make_move"));
const quitGameController = __importStar(require("../controllers/quit_game"));
/*Assumptions:
    - each user can only see their own moves and match status
    - you cannot leave the game if you do not have tokens
*/
const gameRouter = express_1.default.Router();
//create new game
gameRouter.post('/', middlewareCor.createGame, createGameController.createNewGame);
//make a move
gameRouter.post('/play', middlewareCor.makeMove, makeMoveController.makeMove);
//get history
gameRouter.get('/history/:id', middlewareCor.getHistory, getHistotyController.getHistory);
//quit game
gameRouter.put('/quit', middlewareCor.quitGame, quitGameController.quitGame);
//get game status
gameRouter.get('/status/:id', middlewareCor.getStatus, getStatusController.getStatus);
exports.default = gameRouter;
