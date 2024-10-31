"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.errorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const sequelize_1 = require("sequelize");
const zod_1 = require("zod");
const errorFactory_1 = require("../utils/errorFactory");
//middleware for error handling
const errorMiddleware = (error, _req, res, next) => {
    console.error('errorMiddleware:', error);
    //**next(error)**
    // Factory error handling
    if (error.msg && error.statusCode) {
        const err = error;
        res.status(err.statusCode).json({ error: err.msg });
        return;
    }
    //**express-async-errors**
    //Invalid JSON format
    if (error instanceof SyntaxError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 'Invalid JSON format' });
        return;
    }
    //Sequelize error handling
    else if (error instanceof sequelize_1.ValidationError) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json({ SequelizeError: error.errors[0].message });
        return; //return before calling Express error handler with next(error), avoiding console errors output
    }
    //Zod error handling
    else if (error instanceof zod_1.z.ZodError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ ZodError: error.issues });
        return;
    }
    next(error);
};
exports.errorMiddleware = errorMiddleware;
//This middleware will be used for catching requests made to non-existent routes
const unknownEndpoint = (_req, _res, next) => {
    const error = errorFactory_1.factory.getError(http_status_codes_1.StatusCodes.NOT_FOUND, 'unknown endpoint');
    next(error);
    return;
};
exports.unknownEndpoint = unknownEndpoint;
