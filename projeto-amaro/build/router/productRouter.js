"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductBusiness_1 = require("../business/ProductBusiness");
const ProductController_1 = require("../controller/ProductController");
const ProductDatabase_1 = require("../database/ProductDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.productRouter = (0, express_1.Router)();
const productController = new ProductController_1.ProductController(new ProductBusiness_1.ProductBusiness(new ProductDatabase_1.ProductDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator()));
exports.productRouter.get("/", productController.getProducts);
exports.productRouter.get("/tag", productController.getProductsTag);
exports.productRouter.post("/", productController.postProduct);
exports.productRouter.post('/tag/:id', productController.addTag);
//# sourceMappingURL=productRouter.js.map