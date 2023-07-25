"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../repository/product"));
const InitProductService = () => {
    return {
        find: find,
        findById: findById,
        create: create,
        update: update,
        deleteById: deleteById,
    };
};
const find = async (req) => {
    const products = await product_1.default.find(req);
    return products;
};
const findById = async (userId) => {
    const product = await product_1.default.findById(userId);
    return product;
};
const create = async (req) => {
    const products = await product_1.default.find({
        price: req.price,
        title: req.title,
        category: req.category,
    });
    if (products.length > 0)
        throw { status: 403, message: "products already exists" };
    const newProduct = await product_1.default.create(req);
    return newProduct;
};
const update = async (req) => {
    const product = await product_1.default.update(req);
    return product;
};
const deleteById = async (req) => {
    const product = await product_1.default.deleteById(req);
    return product;
};
exports.default = InitProductService();
//# sourceMappingURL=product.js.map