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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const type_1 = require("../utils/type");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        const filePath1 = path.join(__dirname, '../saved_games', 'game_data_losing.JSON');
        const gameState1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));
        const filePath2 = path.join(__dirname, '../saved_games', 'game_data_winning.JSON');
        const gameState2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));
        const filePath3 = path.join(__dirname, '../saved_games', 'game_data_won.JSON');
        const gameState3 = JSON.parse(fs.readFileSync(filePath3, 'utf8'));
        const filePath4 = path.join(__dirname, '../saved_games', 'game_data_drawn.JSON');
        const gameState4 = JSON.parse(fs.readFileSync(filePath4, 'utf8'));
        yield queryInterface.bulkInsert('games', [
            {
                userId: 2,
                aiLevel: 1,
                status: type_1.GameStatus.WON,
                boardObj: JSON.stringify(gameState3),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                aiLevel: 1,
                status: type_1.GameStatus.DRAW,
                boardObj: JSON.stringify(gameState4),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 1,
                aiLevel: 2,
                status: type_1.GameStatus.IN_PROGRESS,
                boardObj: JSON.stringify(gameState1),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                userId: 2,
                aiLevel: 1,
                status: type_1.GameStatus.IN_PROGRESS,
                boardObj: JSON.stringify(gameState2),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.bulkDelete('games', {}, {});
    }),
};
