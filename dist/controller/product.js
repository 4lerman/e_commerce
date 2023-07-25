"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const product_1 = __importDefault(require("../services/product"));
const InitProductController = () => {
    return {
        getByDetails,
        getUserProducts,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};
const getByDetails = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const reqData = req.body;
    const product = await product_1.default.find(reqData);
    res.status(200).json(product);
};
const getUserProducts = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const userId = req.body.user.id;
    if (!userId)
        throw { status: 404, message: "Bad request" };
    const products = await product_1.default.findById(parseInt(userId));
    res.status(200).json(products);
};
const createProduct = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const reqData = { ...req.body, userId: req.body.user.id };
    const newProduct = await product_1.default.create(reqData);
    res.status(200).json(newProduct);
};
const updateProduct = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const productId = req.params.id;
    const userId = req.body.user.id;
    const reqData = {
        ...req.body,
        id: parseInt(productId),
        userId: userId,
    };
    const product = await product_1.default.update(reqData);
    res.status(200).json(product);
};
const deleteProduct = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const productId = req.params.id;
    const userId = req.body.user.id;
    const product = await product_1.default.deleteById({
        id: parseInt(productId),
        userId,
    });
    res.status(200).json(product);
};
exports.default = InitProductController();
//# sourceMappingURL=product.js.map