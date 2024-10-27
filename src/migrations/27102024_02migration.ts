import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
    up: async ({ context: queryInterface }: { context: QueryInterface }) => {
        await queryInterface.addColumn('users', 'points', {
            type: DataTypes.FLOAT,
            defaultValue:0
        })
    }
}