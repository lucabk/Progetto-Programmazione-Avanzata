//COR
import * as authMiddleware from './auth_middleware'
import * as zodValidation from './zod_middleware'

export const createGame = [
    authMiddleware.tokenExtractor,
    zodValidation.createGameParser,
    authMiddleware.getUserById,
    authMiddleware.checkOneGameAtTime,
    authMiddleware.checkMinAmntToken
]

export const makeMove = [
    authMiddleware.tokenExtractor,
    zodValidation.makeMoveParser,
    authMiddleware.getUserById,
    authMiddleware.checkGameById,
    authMiddleware.checkUserOfTheGame,
    authMiddleware.checkStillPlaying
]

export const getHistory = [
    authMiddleware.tokenExtractor,
    authMiddleware.getUserById,
    authMiddleware.checkRemainingTokens,
    authMiddleware.getGameById,
    authMiddleware.checkUserOfTheGame
]

export const getStatus = getHistory

export const refill = [
    authMiddleware.tokenExtractor,
    zodValidation.refillParser,
    authMiddleware.getUserById,
    authMiddleware.isAdmin,
    authMiddleware.userToRefill
]

export const quitGame = [
    authMiddleware.tokenExtractor,
    zodValidation.quitParser,
    authMiddleware.getUserById,
    authMiddleware.checkRemainingTokens,
    authMiddleware.checkGameById,
    authMiddleware.checkUserOfTheGame,
    authMiddleware.checkAlreadyQuitted
]