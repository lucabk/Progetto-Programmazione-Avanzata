import express from "express";
import * as middlewareCor from '../middleware/cor'
import * as getHistotyController from '../controllers/get_history'

const showStatisticsRouter = express.Router()

//get history
showStatisticsRouter.get('/history/:id',
    middlewareCor.getHistory,
    getHistotyController.getHistory
)

//get game status

export default showStatisticsRouter