"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
exports.api = express_1.default.Router();
exports.api.use("/user", user_1.user);
//# sourceMappingURL=index.js.map