"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const error_1 = __importDefault(require("../middlewares/error"));
const auth = __importStar(require("../middlewares/auth"));
exports.user = express_1.default.Router();
exports.user.get("/:id", auth.verify, error_1.default.cover(user_1.default.getUserById));
exports.user.post("/register", error_1.default.cover(user_1.default.register));
exports.user.post("/login", error_1.default.cover(user_1.default.login));
exports.user.post("/logout", error_1.default.cover(user_1.default.logout));
exports.user.post("/refresh", error_1.default.cover(user_1.default.refresh));
//# sourceMappingURL=user.js.map