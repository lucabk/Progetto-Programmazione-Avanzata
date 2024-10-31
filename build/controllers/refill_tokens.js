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
Object.defineProperty(exports, "__esModule", { value: true });
exports.refill = void 0;
const models_1 = require("../models");
const http_status_codes_1 = require("http-status-codes");
const refill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, tokens } = req.body;
    //increment tokens
    yield models_1.User.increment({ tokens }, { where: { username } });
    //return the user updated
    const userUpdate = yield models_1.User.findOne({
        where: { username },
        attributes: ['username', 'tokens']
    });
    res.status(http_status_codes_1.StatusCodes.OK).json({ 'user updated': userUpdate });
});
exports.refill = refill;
