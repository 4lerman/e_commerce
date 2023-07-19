"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repository/user"));
const InitUserService = () => {
    return {
        find: find,
        create: create,
        updateById: updateById,
        deleteById: deleteById,
    };
};
const find = async (req) => {
    const data = await user_1.default.find(req);
    return data;
};
const create = async (req) => {
    const data = await user_1.default.create(req);
    return data;
};
const updateById = async (req) => {
    const data = await user_1.default.updateById(req);
    return data;
};
const deleteById = async (id) => {
    const data = await user_1.default.deleteById(id);
    return data;
};
exports.default = InitUserService();
//# sourceMappingURL=user.js.map