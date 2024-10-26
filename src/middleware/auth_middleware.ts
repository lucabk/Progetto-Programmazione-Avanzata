import express from 'express'
import jwt, { JwtPayload } from "jsonwebtoken"
import { KEY } from '../utils/config'
import { StatusCodes } from 'http-status-codes'
import { factory, ErrorMsg } from '../utils/errorFactory'
import { Game, User } from '../models'
import { MIN_TOKEN } from '../models'
import { newMoveSchema } from '../utils/type'


//This middleware extracts the token from the Authorization header, decodes it, and attaches the decoded token to the request object
export const tokenExtractor = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
    console.log('tokenExtractor')
    //The function retrieves the value of the Authorization header from the request object using the get method
    const authorization = req.get('authorization')
    //The function checks if the authorization header exists and if it starts with the string 'Bearer '
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        //The function jwt.verify decodes the token
        req.decodedToken = jwt.verify(authorization.substring(7), KEY)//types/express/index.d.ts
        console.log('req.decodedToken:',req.decodedToken)
      }catch{
        const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'invalid token')
        next(error)
        return
      }
    //If the authorization header is not present or does not start with 'Bearer ' -> token missing
    }else {
        const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'token missing')
        next(error)
        return
    }
    next()
}


//This middleware extracts the user id from the decoded token and attaches the user object to the request object
export const getUserById = async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('getUserById')
  // req.decodedToken = { username, id }
  const jwt: JwtPayload = req.decodedToken as JwtPayload
  if(!jwt.id || isNaN(parseInt(jwt.id as string))){
    const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'missing user id')
    next(error)
    return
  }

  const userId:number = parseInt(jwt.id as string)

  //find user by id and check if user exists
  const user = await User.findByPk(userId)
  if(!user){
    const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'no user found')
    next(error)
    return
  }
  req.user = user //Attach user to request object
  next()
}


//This middleware checks if the user has enough tokens to start a new game
export const checkMinAmntToken = async (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  console.log('checkMinAmntToken')
  if(req.user.tokens >= MIN_TOKEN){
    await User.decrement({ tokens: MIN_TOKEN }, { where: { id: req.user.id }}) //decrement tokens
    next()
  }else{
    const error:ErrorMsg = factory.getError(StatusCodes.BAD_REQUEST, 'insufficient tokens to start a new game')
    next(error)
  }
}

//This middleware checks if a game with the given id exists and attaches the game object to the request object
export const checkGameById = async (req: express.Request<unknown, unknown, newMoveSchema>, _res: express.Response, next: express.NextFunction) => {
  console.log('checkGameById')
  const gameId:number = req.body.gameId

  const game = await Game.findByPk(gameId)
  if(!game){
    const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'game not fond')
    next(error)
    return
  }
  req.game = game //Attach game to request object
  next()
}


//This middleware checks if the user making the move is the user who created the game
export const checkUserOfTheGame = (req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const userJWT:number = req.user.id
  const userOfTheGame:number = req.game.userId
  if(userJWT !== userOfTheGame){
    const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'you are not the user of the game')
    next(error)
    return
  }
  next()
}