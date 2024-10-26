// Declaration Merging
import { JwtPayload } from "jsonwebtoken";
import { Game, User } from "../../models";

// add  '"typeRoots": ["./src/types"]' in tsconfig.json
declare global {
  namespace Express {
    export interface Request {
      decodedToken:JwtPayload|string
      user:User
      game:Game
    }
  }
}