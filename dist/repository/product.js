"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../utils/prisma"));
const InitProductRepo = () => {
    return {
        find: find,
        findById: findById,
        create: create,
        update: update,
        deleteById: deleteById,
    };
};
const find = async (req) => {
    return await prisma_1.default.product.findMany({
        where: {
            price: {
                gt: 1,
                lte: req.price,
            },
            category: req.category,
            title: {
                contains: req.title,
            },
        },
    });
};
const findById = async (userId) => {
    return await prisma_1.default.product.findMany({
        where: {
            userId: userId
        },
    });
};
const create = async (req) => {
    return await prisma_1.default.product.create({
        data: {
            title: req.title,
            category: req.category,
            description: req.description,
            price: req.price,
            image: req.image,
            amount: req.amount,
            userId: req.userId,
        }
    });
};
const update = async (req) => {
    const product = await prisma_1.default.product.findFirst({
        where: {
            id: req.id,
            userId: req.userId,
        },
    });
    if (!product)
        throw { status: 404, message: "product not found" };
    return await prisma_1.default.product.update({
        where: {
            id: req.id,
            userId: req.userId,
        },
        data: {
            title: req.title,
            category: req.category,
            description: req.description,
            price: req.price,
            image: req.image,
            amount: req.amount,
        },
    });
};
const deleteById = async (req) => {
    const product = await prisma_1.default.product.findFirst({
        where: {
            id: req.id,
            userId: req.userId,
        },
    });
    if (!product)
        throw { status: 404, message: "product not found" };
    return await prisma_1.default.product.delete({
        where: {
            id: req.id,
            userId: req.userId,
        },
    });
};
exports.default = InitProductRepo();
//# sourceMappingURL=product.js.map