import { Request, Response, NextFunction } from 'express';
import { newUserSchema } from '../utils/type';

//login middleware zod validation
export const userLoginParser = (req:Request, _res:Response, next:NextFunction) => {
    console.log('userLoginParser')
    newUserSchema.parse(req.body)
    next()
}