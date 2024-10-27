//COR
import * as authMiddleware from './auth_middleware'
import * as zodValidation from './zod_middleware'

export const createGame = [
    authMiddleware.tokenExtractor,
    zodValidation.createGameParser,
    authMiddleware.getUserById,
    authMiddleware.checkMinAmntToken
]

export const makeMove = [
    authMiddleware.tokenExtractor,
    zodValidation.makeMoveParser,
    authMiddleware.getUserById,
    authMiddleware.checkGameById,
    authMiddleware.checkUserOfTheGame
]

export const history = [
    authMiddleware.tokenExtractor,
    authMiddleware.getUserById,
    authMiddleware.getGameById,
    authMiddleware.checkUserOfTheGame
]