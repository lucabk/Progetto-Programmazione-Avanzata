"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quitParser = exports.refillParser = exports.makeMoveParser = exports.createGameParser = exports.userLoginParser = void 0;
const type_1 = require("../utils/type");
//login middleware zod validation
const userLoginParser = (req, _res, next) => {
    console.log('userLoginParser');
    type_1.newUserSchema.parse(req.body);
    next();
};
exports.userLoginParser = userLoginParser;
//create game middleware zod validation
const createGameParser = (req, _res, next) => {
    console.log('createGameParser');
    type_1.newGameSchema.parse(req.body);
    next();
};
exports.createGameParser = createGameParser;
//make a move middleware zod validation
const makeMoveParser = (req, _res, next) => {
    console.log('makeMoveParser');
    type_1.newMoveSchema.parse(req.body);
    next();
};
exports.makeMoveParser = makeMoveParser;
//tokens refill middleware zod validation
const refillParser = (req, _res, next) => {
    console.log('refillParser');
    type_1.newRefillSchema.parse(req.body);
    next();
};
exports.refillParser = refillParser;
//quit game middleware zod validation
const quitParser = (req, _res, next) => {
    console.log('quitParser');
    type_1.newQuitSchema.parse(req.body);
    next();
};
exports.quitParser = quitParser;
