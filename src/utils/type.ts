import { z } from 'zod';
import { MIN_TOKEN } from '../models';

//login user validation
export const newUserSchema = z.object({
    username: z.string().min(1).max(255), //DataTypes.STRING=== VARCHAR(255)
    password: z.string().min(8).max(255),
    tokens: z.number().nonnegative().default(MIN_TOKEN),
    isAdmin: z.boolean().default(false)
})
export type newUserEntry = z.infer< typeof newUserSchema > //new type