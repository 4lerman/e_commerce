"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const middlewares_1 = __importDefault(require("../middlewares"));
exports.user = express_1.default.Router();
exports.user.get("", middlewares_1.default.cover(user_1.default.getUser));
exports.user.post("", middlewares_1.default.cover(user_1.default.createUser));
//# sourceMappingURL=user.js.map