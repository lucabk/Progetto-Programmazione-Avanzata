import { config } from 'dotenv';

// Load environment variables from .env file into process.env
config();

export const DATABASE_URL: string | undefined = process.env.DATABASE_URL;
export const PORT: number = Number(process.env.PORT) || 3001;
export const KEY: string = String(process.env.KEY)
export const MIGRATION_PATH: string  = process.env.MIGRATION_URL || '/home/luca/progetto_PA/Progetto-Programmazione-Avanzata/src/migrations/*.ts'
export const SEED_PATH: string = process.env.SEED_PATH || '/home/luca/progetto_PA/Progetto-Programmazione-Avanzata/src/seeds/*.ts'