"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../repository/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const token_1 = __importDefault(require("./token"));
dotenv_1.default.config();
const InitUserService = () => {
    return {
        find: find,
        create: create,
        update: update,
        login: login,
        logout: logout,
        refresh: refresh,
    };
};
const find = async (req) => {
    const data = await user_1.default.find(req);
    return data;
};
const create = async (req) => {
    const hash = await bcrypt_1.default.hash(req.password, parseInt(String(process.env.SALT_ROUND)));
    const user = (await user_1.default.create({ ...req, password: hash }));
    delete user.password;
    const tokens = await token_1.default.generateToken({
        id: user.id,
        email: user.email,
    });
    await token_1.default.saveToken({ userId: user.id, token: tokens.refreshToken });
    return { ...tokens, user };
};
const login = async (req) => {
    const user = (await user_1.default.find({ email: req.email, id: 0 }));
    if (!user)
        throw { status: 403, message: "User does not exist" };
    const isEqual = await bcrypt_1.default.compare(req.password, user.password);
    if (!isEqual)
        throw { status: 400, message: "Info does not match. Try again" };
    delete user.password;
    const tokens = await token_1.default.generateToken({
        id: user.id,
        email: user.email,
    });
    await token_1.default.saveToken({ userId: user.id, token: tokens.refreshToken });
    return { ...tokens, user };
};
const logout = async (refreshToken) => {
    return await token_1.default.removeToken(refreshToken);
};
const update = async (req) => {
    const data = await user_1.default.update(req);
    return data;
};
const refresh = async (refreshToken) => {
    if (!refreshToken)
        throw { status: 401, message: "User is unaurthorized" };
    const token = await token_1.default.validateRToken(refreshToken);
    if (token !== undefined) {
        const user = (await user_1.default.find({ id: token.id, email: "" }));
        delete user.password;
        const tokens = await token_1.default.generateToken({
            id: user.id,
            email: user.email,
        });
        await token_1.default.saveToken({
            userId: user.id,
            token: tokens.refreshToken,
        });
        return { ...tokens, user };
    }
};
exports.default = InitUserService();
//# sourceMappingURL=user.js.map