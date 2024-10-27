import { z } from 'zod';
import { MIN_TOKEN } from '../models';
import { DraughtsEngineData } from 'rapid-draughts/dist/core/engine';
import { EnglishDraughtsEngineStore } from 'rapid-draughts/dist/english/engine';
import { DraughtsGameHistory1D } from 'rapid-draughts/dist/core/game';


//login user validation
export const newUserSchema = z.object({
    username: z.string().email().min(1).max(255), //DataTypes.STRING=== VARCHAR(255)
    password: z.string().min(8).max(255),
    tokens: z.number().nonnegative().default(MIN_TOKEN),
    isAdmin: z.boolean().default(false)
})
export type newUserEntry = z.infer< typeof newUserSchema > //new type


//create game validation
export const newGameSchema = z.object({
    difficulty: z.number().nonnegative().max(10).int()        //alpha-beta max depth
})
export type newGameEntry = z.infer< typeof newGameSchema >


//make a move validation
export const newMoveSchema = z.object({
    origin: z.number().nonnegative().int().min(0).max(31),  //0-31 board black square
    destination: z.number().nonnegative().int().min(0).max(31),
    gameId: z.number().nonnegative().int()
})
export type newMoveEntry = z.infer< typeof newMoveSchema >


//refill validation
export const newRefillSchema = z.object({
    username: z.string().email().min(1).max(255),
    tokens: z.number().nonnegative()
})
export type newRefillEntry = z.infer< typeof newRefillSchema>


//boardObj interface
export interface BoardObjInterface {
    data: Partial<DraughtsEngineData<number, EnglishDraughtsEngineStore>>;
    history: Partial<DraughtsGameHistory1D>;
}