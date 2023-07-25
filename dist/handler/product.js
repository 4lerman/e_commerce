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
exports.product = void 0;
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../controller/product"));
const error_1 = __importDefault(require("../middlewares/error"));
const auth = __importStar(require("../middlewares/auth"));
exports.product = express_1.default.Router();
exports.product.get("", auth.verify, error_1.default.cover(product_1.default.getByDetails));
exports.product.get("/myproducts", auth.verify, error_1.default.cover(product_1.default.getUserProducts));
exports.product.post("", auth.verify, error_1.default.cover(product_1.default.createProduct));
exports.product.put("/:id", auth.verify, error_1.default.cover(product_1.default.updateProduct));
exports.product.delete("/:id", auth.verify, error_1.default.cover(product_1.default.deleteProduct));
//# sourceMappingURL=product.js.map