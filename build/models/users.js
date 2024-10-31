"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_TOKEN = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
exports.MIN_TOKEN = 0.45;
class User extends sequelize_1.Model {
}
User.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true // checks for email format (foo@bar.com)
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tokens: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: exports.MIN_TOKEN // allowNull defaults to true
    },
    points: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0
    },
    isAdmin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: db_1.sequelize,
    tableName: 'users',
    timestamps: true,
    modelName: 'user'
});
exports.default = User;
