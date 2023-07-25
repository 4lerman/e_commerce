"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const product_1 = require("./product");
exports.api = express_1.default.Router();
exports.api.use("/user", user_1.user);
exports.api.use("/product", product_1.product);
//# sourceMappingURL=index.js.map