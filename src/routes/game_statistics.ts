import express from "express";
import * as middlewareCor from '../middleware/cor'
import * as getHistotyController from '../controllers/get_history'

const showStatisticsRouter = express.Router()

//history
showStatisticsRouter.get('/history/:id',
    middlewareCor.history,
    getHistotyController.getHistory
)

//status

export default showStatisticsRouter