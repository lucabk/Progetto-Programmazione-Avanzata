/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryInterface } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { GameStatus } from '../utils/type';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    const filePath1 = path.join(__dirname, '../saved_games', 'game_data_losing.JSON');
    const gameState1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));

    const filePath2 = path.join(__dirname, '../saved_games', 'game_data_winning.JSON');
    const gameState2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));   
    
    const filePath3 = path.join(__dirname, '../saved_games', 'game_data_won.JSON');
    const gameState3 = JSON.parse(fs.readFileSync(filePath3, 'utf8'));

    const filePath4 = path.join(__dirname, '../saved_games', 'game_data_drawn.JSON');
    const gameState4 = JSON.parse(fs.readFileSync(filePath4, 'utf8'));

        await queryInterface.bulkInsert('games', [
          {//won
            userId: 2,
            aiLevel: 1,
            status: GameStatus.WON,            
            boardObj: JSON.stringify(gameState3),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {//drawn
            userId: 2,
            aiLevel: 1,
            status: GameStatus.DRAW,            
            boardObj: JSON.stringify(gameState4),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {//losing
            userId: 1,
            aiLevel: 2,
            status: GameStatus.IN_PROGRESS,
            boardObj: JSON.stringify(gameState1),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {//winning
            userId: 2,
            aiLevel: 1,
            status: GameStatus.IN_PROGRESS,            
            boardObj: JSON.stringify(gameState2),
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ]);
      
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.bulkDelete('games', {}, {});
  },
};