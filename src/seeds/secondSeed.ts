/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QueryInterface } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    const filePath1 = path.join(__dirname, '../saved_games', 'game_data_losing.JSON');
    const gameState1 = JSON.parse(fs.readFileSync(filePath1, 'utf8'));

    const filePath2 = path.join(__dirname, '../saved_games', 'game_data_win.JSON');
    const gameState2 = JSON.parse(fs.readFileSync(filePath2, 'utf8'));    

        await queryInterface.bulkInsert('games', [
          {//lose
            userId: 1,
            aiLevel: 2,
            status: 'in_progress',
            boardObj: JSON.stringify(gameState1),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {//win
            userId: 2,
            aiLevel: 1,
            status: 'in_progress',            
            boardObj: JSON.stringify(gameState2),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.bulkDelete('games', {}, {});
  },
};