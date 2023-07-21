"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
const InitTokenRepo = () => {
    return {
        find: find,
        create: create,
        save: save,
        deleteToken: deleteToken,
    };
};
const find = async (req) => {
    return await prisma_1.default.refreshTokens.findFirst({
        where: {
            OR: [{ userId: req.userId }, { token: req.refreshToken }],
        },
    });
};
const create = async (req) => {
    return await prisma_1.default.refreshTokens.create({
        data: {
            userId: req.userId,
            token: req.token,
        },
    });
};
const save = async (req) => {
    return await prisma_1.default.refreshTokens.update({
        where: {
            userId: req.userId,
        },
        data: {
            token: req.token,
        },
    });
};
const deleteToken = async (refreshToken) => {
    const tokenData = await prisma_1.default.refreshTokens.findFirst({
        where: {
            token: refreshToken,
        },
    });
    if (!tokenData)
        throw { status: 500, message: "error ocurred" };
    const token = await prisma_1.default.refreshTokens.delete({
        where: {
            userId: tokenData.userId,
        },
    });
    return token;
};
exports.default = InitTokenRepo();
//# sourceMappingURL=token.js.map