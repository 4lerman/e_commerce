"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const express_validator_1 = require("express-validator");
const InitUserController = () => {
    return {
        getUser: getUser,
        register: register,
    };
};
const getUser = async (req, res, next) => {
    const data = {
        id: req.body.id,
        email: req.body.email,
    };
    const user = await user_1.default.find(data);
    if (!user || user === undefined)
        throw { status: 404, message: "Does not exist" };
    res.status(200).json(user);
};
const register = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw { status: 400, message: "invalid input" };
    const { name, email, password } = req.body;
    const data = {
        name: name,
        email: email,
        password: password,
    };
    const userExists = await user_1.default.find({
        id: req.body.id,
        email: req.body.email,
    });
    if (userExists)
        throw { status: 403, message: "Already exists" };
    const newUser = await user_1.default.create(data);
    res.cookie("accessToken", newUser.accessToken, {
        maxAge: 5 * 60 * 1000,
        httpOnly: false,
        path: "/",
    });
    res.cookie("refreshToken", newUser.refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        path: "/",
    });
    res.status(200).json(newUser);
};
exports.default = InitUserController();
//# sourceMappingURL=user.js.map