import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { User } from "../models"//If the models directory contains an index.ts file, you can import from it directly
import { newUserEntry } from "../utils/type"
import exepress, { NextFunction } from 'express'
import { userLoginParser } from "../middleware/zod_middleware"
import { Request, Response } from 'express';
import { KEY } from "../utils/config"
import { StatusCodes } from "http-status-codes"
import { factory, ErrorMsg } from "../utils/errorFactory"

const loginRouter = exepress.Router()

loginRouter.post('/', userLoginParser, async (req: Request<unknown, unknown, newUserEntry>, res:Response, next:NextFunction) => {
    const { username, password } = req.body
    const userToAuthenticate = await User.findOne({ where : {username}})
    
    //If the user is found, the code compares the provided password with the stored password hash
    const passwordCorrect = userToAuthenticate === null ? 
        false : 
        await bcrypt.compare(password,(userToAuthenticate.password))

    //If the user is not found or the password is incorrect
    if(!userToAuthenticate || !passwordCorrect){
        const error:ErrorMsg = factory.getError(StatusCodes.UNAUTHORIZED, 'user not found or incorrect password')
        next(error)
        return
    }
    //If the credentials are valid, the code creates a token payload (userForToken) containing the username and id
    const userForToken = {
        username: username,
        id: userToAuthenticate.id
    }
    /*The token is then signed using a secret key from the environment variables and expires in one hour
    Once the token expires, the client app needs to get a new token. Usually, this happens by forcing the user to re-login to the app*/
    const token = jwt.sign(
        userForToken,
        KEY                                         //,{ expiresIn: 60*60 }
    )
    res.json({token, username})
    console.log('TOKEN sent')
})


export default loginRouter