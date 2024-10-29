import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE username = 'user1@example.com' OR username = 'user2@example.com';`
    );

    if (users[0].length === 0) {
      await queryInterface.bulkInsert('users', [
        {
          username: 'user1@example.com',
          password: await bcrypt.hash('password1', 10),
          tokens: 10,
          isAdmin: false,
          points: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'user2@example.com',
          password: await bcrypt.hash('password2', 10),
          tokens: 0.45,
          points: 1,
          isAdmin:false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            username: 'admin@example.com',
            password: await bcrypt.hash('adminpassword', 10),
            tokens: 100,
            points: 10,
            isAdmin: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            username: 'user3@example.com',
            password: await bcrypt.hash('password3', 10),
            tokens: 0,
            points: 0,
            isAdmin:false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
      ]);
    }
  },

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.bulkDelete('users', {}, {});
  },
};