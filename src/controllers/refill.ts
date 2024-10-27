import { newRefillEntry } from "../utils/type";
import { Request, Response } from 'express';
import { User } from "../models";
import { StatusCodes } from "http-status-codes";

export const refill = async (req:Request<unknown, unknown, newRefillEntry>, res:Response) => {
    const { username, tokens } = req.body
    await User.increment({ tokens }, { where: { username}})

    const userUpdate = await User.findOne({ 
        where: {username },
        attributes: ['username', 'tokens'] 
    })

    res.status(StatusCodes.CREATED).json({ 'user updated': userUpdate })
}