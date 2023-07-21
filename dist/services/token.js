"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../repository/token"));
require("dotenv/config");
const InitTokenService = () => {
    return {
        generateToken: generateToken,
        saveToken: saveToken,
        removeToken: removeToken,
        validateAToken: validateAToken,
        validateRToken: validateRToken,
    };
};
const generateToken = async (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: "5min",
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
const saveToken = async (req) => {
    const tokenData = await token_1.default.find({
        userId: req.userId,
        refreshToken: req.token,
    });
    if (tokenData) {
        tokenData.token = req.token;
        token_1.default.save(tokenData);
        return;
    }
    await token_1.default.create(req);
};
const removeToken = async (refreshToken) => {
    return await token_1.default.deleteToken(refreshToken);
};
const validateAToken = async (accessToken) => {
    try {
        return jsonwebtoken_1.default.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
    }
    catch {
        throw { status: 401, message: "User is unauthorized" };
    }
};
const validateRToken = async (refreshToken) => {
    try {
        const user = jsonwebtoken_1.default.verify(refreshToken, String(process.env.ACCESS_TOKEN_SECRET));
        const token = await token_1.default.find({
            userId: 0,
            refreshToken: refreshToken,
        });
        if (token && user)
            return user;
    }
    catch {
        throw { status: 401, message: "User is unauthorized: please login again" };
    }
};
exports.default = InitTokenService();
//# sourceMappingURL=token.js.map