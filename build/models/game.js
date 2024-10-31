"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const type_1 = require("../utils/type");
class Game extends sequelize_1.Model {
}
Game.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    aiLevel: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: type_1.GameStatus.IN_PROGRESS,
    },
    boardObj: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'games',
    timestamps: true,
    modelName: 'game'
});
exports.default = Game;
