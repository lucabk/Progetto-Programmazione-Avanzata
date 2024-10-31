"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = createGame;
const english_1 = require("rapid-draughts/english");
function createGame() {
    // Initialise the game
    const draughts = english_1.EnglishDraughts.setup();
    return { draughts };
}
