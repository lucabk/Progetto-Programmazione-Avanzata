import { QueryInterface } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    const filePath = path.join(__dirname, '../saved_games', 'game_data_losing.JSON');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const gameState = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        await queryInterface.bulkInsert('games', [
          {
            userId: 1,
            aiLevel: 2,
            status: 'in_progress',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            boardObj: JSON.stringify(gameState),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.bulkDelete('games', {}, {});
  },
};