import express from 'express'
import * as middlewareCor from '../middleware/cor'
import * as refillController from '../controllers/refill_tokens'

const refillRouter = express.Router()

//Assumption: the user admin can operate with own negative tokens

//refill tokens
refillRouter.put('/',
    middlewareCor.refill,
    refillController.refill
)

export default refillRouter