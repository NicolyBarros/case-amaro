"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pingRouter_1 = require("./router/pingRouter");
const userRouter_1 = require("./router/userRouter");
const productRouter_1 = require("./router/productRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log(`Server running on port ${process.env.PORT || 3003}`);
});
app.use("/ping", pingRouter_1.pingRouter);
app.use("/users", userRouter_1.userRouter);
app.use("/products", productRouter_1.productRouter);
//# sourceMappingURL=index.js.map