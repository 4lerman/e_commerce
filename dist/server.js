"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_js_1 = __importDefault(require("./middlewares/index.js"));
const handler_1 = require("./handler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)(config_1.default.cors));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", handler_1.api);
app.use(index_js_1.default.errorHandler);
// app.use("/", (req: Request, res: Response) => {
// 	res.status(200).json("Working");
// });
app.listen(PORT, () => console.log(`Server running on port - ${PORT}`));
//# sourceMappingURL=server.js.map