import { DataTypes, QueryInterface } from 'sequelize';
import { MIN_TOKEN } from '../models';

module.exports = {
  up: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.createTable('users', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate : {
                isEmail:true // checks for email format (foo@bar.com)
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tokens:{
            type: DataTypes.FLOAT,
            defaultValue:MIN_TOKEN  // allowNull defaults to true
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

},

  down: async ({ context: queryInterface }: { context: QueryInterface }) => {
    await queryInterface.dropTable('users');
  },
};