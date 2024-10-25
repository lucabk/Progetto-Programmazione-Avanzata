import { StatusCodes } from 'http-status-codes'
import { ValidationError } from "sequelize";
import { z } from 'zod';
import express from "express";
import { ErrorMsg, factory } from '../utils/errorFactory';
import { NextFunction, Request, Response } from 'express'


//middleware for error handling
export const errorMiddleware = (error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('errorMiddleware:',error);

    //**next(error)**

    // Factory error handling
    if ((error as ErrorMsg).msg && (error as ErrorMsg).statusCode){
        const err = error as ErrorMsg
        res.status(err.statusCode).json({ error : err.msg })
        return
    }

    //**express-async-errors**

    //Sequelize error handling
    if(error instanceof ValidationError){
        res.status(StatusCodes.CONFLICT).json({ error : error.errors[0].message })
        return //return before calling Express error handler with next(error), avoiding console errors output
    }

    //Zod error handling
    if (error instanceof z.ZodError) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: error.issues });
      return
    } 
    next(error)
};


//This middleware will be used for catching requests made to non-existent routes
export const unknownEndpoint = (_req:Request, _res:Response, next:NextFunction) => {
    const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'unknown endpoint')
    next(error)
    return
}
