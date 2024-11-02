"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        const users = yield queryInterface.sequelize.query(`SELECT id FROM users WHERE username = 'user1@example.com' OR username = 'user2@example.com';`);
        if (users[0].length === 0) {
            yield queryInterface.bulkInsert('users', [
                {
                    username: 'user1@example.com',
                    password: yield bcrypt_1.default.hash('password1', 10),
                    tokens: 10,
                    isAdmin: false,
                    points: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'user2@example.com',
                    password: yield bcrypt_1.default.hash('password2', 10),
                    tokens: 0.45,
                    points: 1,
                    isAdmin: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'admin@example.com',
                    password: yield bcrypt_1.default.hash('adminpassword', 10),
                    tokens: 100,
                    points: 10,
                    isAdmin: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    username: 'user3@example.com',
                    password: yield bcrypt_1.default.hash('password3', 10),
                    tokens: 0,
                    points: 0,
                    isAdmin: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.bulkDelete('users', {}, {});
    }),
};
