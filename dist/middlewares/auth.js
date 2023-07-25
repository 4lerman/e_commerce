"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const token_1 = __importDefault(require("../services/token"));
const verify = async (req, res, next) => {
    const accessToken = req.cookies.accessToken || req.cookies["accessToken"];
    if (!accessToken)
        return res.status(403).send("Login first");
    try {
        const data = await token_1.default.validateAToken(accessToken);
        req.body.user = data;
        next();
    }
    catch {
        res.status(401).send('Please authenticate');
    }
};
exports.verify = verify;
//# sourceMappingURL=auth.js.map