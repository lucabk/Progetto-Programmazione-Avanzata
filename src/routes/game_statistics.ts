import express from "express";
import * as middlewareCor from '../middleware/cor'
import * as getHistotyController from '../controllers/get_history'
import * as getStatusController from '../controllers/get_status'

const showStatisticsRouter = express.Router()

//Assumption: each user can only see their own moves and match status

//get history
showStatisticsRouter.get('/history/:id',
    middlewareCor.getHistory,
    getHistotyController.getHistory
)

//get game status
showStatisticsRouter.get('/status/:id',
    middlewareCor.getStatus,
    getStatusController.getStatus
)

export default showStatisticsRouter