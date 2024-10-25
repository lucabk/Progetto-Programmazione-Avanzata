//COR
import * as authMiddleware from './auth_middleware'
import * as zodValidation from './zod_middleware'

export const createGame = [
    authMiddleware.tokenExtractor,
    zodValidation.createGameParser,
    authMiddleware.getUserById,
    authMiddleware.checkMinAmntToken
]