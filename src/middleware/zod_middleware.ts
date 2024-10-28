import { Request, Response, NextFunction } from 'express';
import { newUserSchema, newGameSchema, newMoveSchema, newRefillSchema, newQuitSchema } from '../utils/type';

//login middleware zod validation
export const userLoginParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('userLoginParser')
    newUserSchema.parse(req.body)
    next()
}

//create game middleware zod validation
export const createGameParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('createGameParser')
    newGameSchema.parse(req.body)
    next()
}

//make a move middleware zod validation
export const makeMoveParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('makeMoveParser')
    newMoveSchema.parse(req.body)
    next()
}

//tokens refill middleware zod validation
export const refillParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('refillParser')
    newRefillSchema.parse(req.body)
    next()
}

//quit game middleware zod validation
export const quitParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('quitParser')
    newQuitSchema.parse(req.body)
    next()
}