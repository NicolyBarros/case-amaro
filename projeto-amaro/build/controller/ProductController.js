"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const BaseError_1 = require("../errors/BaseError");
class ProductController {
    constructor(productBusiness) {
        this.productBusiness = productBusiness;
        this.getProducts = async (req, res) => {
            try {
                const input = {
                    search: req.query.search
                };
                const response = await this.productBusiness.getProducts(input);
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado ao buscar produtos." });
            }
        };
        this.getProductsTag = async (req, res) => {
            try {
                const input = {
                    search: req.query.search
                };
                const response = await this.productBusiness.getProductsTags(input);
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Unexpected error." });
            }
        };
        this.postProduct = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    name: req.body.name
                };
                const response = await this.productBusiness.postProduct(input);
                res.status(201).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Unexpected error." });
            }
        };
        this.addTag = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id,
                    tagName: req.body.tagName,
                };
                const response = await this.productBusiness.addTag(input);
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Unexpected error." });
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map