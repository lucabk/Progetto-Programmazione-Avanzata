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
exports.checkOneGameAtTime = exports.checkStillPlaying = exports.checkAlreadyQuitted = exports.userToRefill = exports.isAdmin = exports.checkRemainingTokens = exports.getGameById = exports.checkUserOfTheGame = exports.checkGameById = exports.checkMinAmntToken = exports.getUserById = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const http_status_codes_1 = require("http-status-codes");
const errorFactory_1 = require("../utils/errorFactory");
const models_1 = require("../models");
const models_2 = require("../models");
const type_1 = require("../utils/type");
//This middleware extracts the token from the Authorization header, decodes it, and attaches the decoded token to the request object
const tokenExtractor = (req, _res, next) => {
    console.log('tokenExtractor');
    //The function retrieves the value of the Authorization header from the request object using the get method
    const authorization = req.get('authorization');
    //The function checks if the authorization header exists and if it starts with the string 'Bearer '
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            //The function jwt.verify decodes the token
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.KEY); //types/express/index.d.ts
            console.log('req.decodedToken:', req.decodedToken);
        }
        catch (_a) {
            const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'invalid token');
            next(error);
            return;
        }
        //If the authorization header is not present or does not start with 'Bearer ' -> token missing
    }
    else {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'token missing');
        next(error);
        return;
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
//This middleware extracts the user id from the decoded token and attaches the user object to the request object
const getUserById = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getUserById');
    // req.decodedToken = { username, id }
    const jwt = req.decodedToken;
    if (!jwt.id || isNaN(parseInt(jwt.id))) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'missing user id');
        next(error);
        return;
    }
    const userId = parseInt(jwt.id);
    //find user by id and check if user exists
    const user = yield models_1.User.findByPk(userId);
    if (!user) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'no user found');
        next(error);
        return;
    }
    req.user = user; //Attach user to request object
    next();
});
exports.getUserById = getUserById;
//This middleware checks if the user has enough tokens to start a new game
const checkMinAmntToken = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('checkMinAmntToken');
    if (req.user.tokens >= models_2.MIN_TOKEN) {
        yield models_1.User.decrement({ tokens: models_2.MIN_TOKEN }, { where: { id: req.user.id } }); //decrement tokens
        next();
    }
    else {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'insufficient tokens to start a new game');
        next(error);
    }
});
exports.checkMinAmntToken = checkMinAmntToken;
//This middleware checks if a game with the given id exists and attaches the game object to the request object
const checkGameById = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('checkGameById');
    const gameId = req.body.gameId;
    const game = yield models_1.Game.findByPk(gameId);
    if (!game) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'game not found');
        next(error);
        return;
    }
    req.game = game; //Attach game to request object
    next();
});
exports.checkGameById = checkGameById;
//This middleware checks if the user making the move is the user who created the game
const checkUserOfTheGame = (req, _res, next) => {
    console.log('checkUserOfTheGame');
    const userJWT = req.user.id;
    const userOfTheGame = req.game.userId;
    if (userJWT !== userOfTheGame) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not the user of the game');
        next(error);
        return;
    }
    next();
};
exports.checkUserOfTheGame = checkUserOfTheGame;
//This middleware checks if the game the user is looking for exists
const getGameById = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getGameById');
    //retrieve game id
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || !Number.isInteger(id)) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid ID format. ID must be a number.');
        next(error);
        return;
    }
    //search game by id
    const game = yield models_1.Game.findByPk(id);
    if (!game) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'game not found');
        next(error);
        return;
    }
    req.game = game;
    next();
});
exports.getGameById = getGameById;
//This middleware checks if the user has tokens to do any request
const checkRemainingTokens = (req, _res, next) => {
    console.log('checkRemainingTokens');
    //check tokens of the user
    if (req.user.tokens <= 0) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, `terminated tokens for the user ${req.user.username}`);
        next(error);
        return;
    }
    next();
};
exports.checkRemainingTokens = checkRemainingTokens;
//This middleware checks if the user has admin role
const isAdmin = (req, _res, next) => {
    console.log('isAdmin');
    if (!req.user.isAdmin) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'only a user with admin privileges may reload tokens');
        next(error);
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
//This middleware checks if the user to refill exists
const userToRefill = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('userToRefill');
    //username to refill
    const { username } = req.body;
    //query db
    const usernameToRefill = yield models_1.User.findOne({ where: { username } });
    if (!usernameToRefill) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'user to refill not found');
        next(error);
        return;
    }
    next();
});
exports.userToRefill = userToRefill;
//This middleware checks if the user has already quitted
const checkAlreadyQuitted = (req, _res, next) => {
    console.log('checkAlreadyQuitted');
    if (req.game.status === type_1.GameStatus.QUITTED) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Game already quitted!');
        next(error);
        return;
    }
    next();
};
exports.checkAlreadyQuitted = checkAlreadyQuitted;
//This middleware checks if the game is still in progress
const checkStillPlaying = (req, _res, next) => {
    console.log('checkStillPlaying');
    const stillPlaying = req.game.status === type_1.GameStatus.IN_PROGRESS; //? true : false
    if (!stillPlaying) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.BAD_REQUEST, `You cannot play; the game has already ended with status: ${req.game.status}.`);
        next(error);
        return;
    }
    next();
};
exports.checkStillPlaying = checkStillPlaying;
//This middleware checks that a user can only play one game at a time 
const checkOneGameAtTime = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('checkOneGameAtTime');
    const userId = req.user.id;
    const game = yield models_1.Game.findOne({
        where: {
            userId,
            status: type_1.GameStatus.IN_PROGRESS
        },
    });
    if (game) {
        const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.BAD_REQUEST, `user can only play one game at a time; you're playing game with id: ${game.id}`);
        next(error);
        return;
    }
    next();
});
exports.checkOneGameAtTime = checkOneGameAtTime;
