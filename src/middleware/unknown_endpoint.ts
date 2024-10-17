import { StatusCodes } from  'http-status-codes'
import { NextFunction, Request, Response } from 'express'
import { factory, ErrorMsg } from '../utils/errorFactory'

//This middleware will be used for catching requests made to non-existent routes
export const unknownEndpoint = (_req:Request, _res:Response, next:NextFunction) => {
    const error:ErrorMsg = factory.getError(StatusCodes.NOT_FOUND, 'unknown endpoint')
    next(error)
    return
  }
