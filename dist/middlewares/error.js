"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InitMiddlewares = () => {
    return {
        errorHandler: errorHanlder,
        cover: cover,
    };
};
const errorHanlder = (err, req, res, next) => {
    console.error(err);
    const status = err.status;
    if (status !== undefined) {
        res.status(status).json(err);
        return;
    }
    res.status(500).json({ error: "Something went wrong" });
};
const cover = (fn) => async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.default = InitMiddlewares();
//# sourceMappingURL=error.js.map