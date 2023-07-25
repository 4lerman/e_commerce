"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
const InitUserRepo = () => {
    return {
        find: find,
        create: create,
        update: update,
        deleteById: deleteById,
    };
};
const find = async (req) => {
    return await prisma_1.default.user.findFirst({
        where: {
            OR: [{ id: req.id }, { email: req.email }],
        },
        include: {
            products: true,
        },
    });
};
const create = async (req) => {
    return await prisma_1.default.user.create({
        data: {
            name: req.name,
            email: req.email,
            password: req.password,
        },
    });
};
const update = async (req) => {
    const user = await prisma_1.default.user.findFirst({
        where: {
            email: req.email,
        },
    });
    if (!user)
        throw { status: 404, message: "not found" };
    return await prisma_1.default.user.update({
        data: {
            name: req.name,
            email: req.email,
        },
        where: {
            id: req.id,
        },
        include: {
            products: true,
        },
    });
};
const deleteById = async (id) => {
    const user = await prisma_1.default.user.findFirst({
        where: {
            id: id,
        },
    });
    if (!user)
        throw { status: 404, message: "not found" };
    return await prisma_1.default.user.delete({
        where: {
            id: id,
        },
    });
};
exports.default = InitUserRepo();
//# sourceMappingURL=user.js.map