"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistory = void 0;
const getHistory = (req, res) => {
    const gameState = req.game.boardObj;
    const moves = gameState.history.moves;
    console.log('Move history:\n', moves);
    res.json({ moves });
};
exports.getHistory = getHistory;
