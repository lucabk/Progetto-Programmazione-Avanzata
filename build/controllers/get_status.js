"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = void 0;
const getStatus = (req, res) => {
    const status = req.game.status;
    console.log('Game status: ', status);
    res.json({ status });
};
exports.getStatus = getStatus;
