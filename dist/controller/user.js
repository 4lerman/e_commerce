"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const InitUserController = () => {
    return {
        getUser: getUser,
        createUser: createUser,
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
const createUser = async (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    const userExists = await user_1.default.find({
        ...req.body.id,
        ...req.body.email,
    });
    if (userExists)
        throw { status: 403, message: "Already exists" };
    const newUser = await user_1.default.create(data);
    res.status(200).json(newUser);
};
exports.default = InitUserController();
//# sourceMappingURL=user.js.map