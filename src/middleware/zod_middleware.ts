import { Request, Response, NextFunction } from 'express';
import { newUserSchema, newGameSchema } from '../utils/type';

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