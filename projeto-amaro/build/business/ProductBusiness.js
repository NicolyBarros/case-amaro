"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBusiness = void 0;
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
const RequestError_1 = require("../errors/RequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Products_1 = require("../models/Products");
class ProductBusiness {
    constructor(productDataBase, idGenerator, hashManager, authenticator) {
        this.productDataBase = productDataBase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.getProducts = async (input) => {
            const search = input.search;
            if (search) {
                const productsDB = await this.productDataBase.getProductsBySearch(search);
                if (productsDB.length === 0) {
                    throw new RequestError_1.RequestError("No products found with this search.");
                }
                const products = productsDB.map(productDB => {
                    return new Products_1.Product(productDB.id, productDB.name);
                });
                for (let product of products) {
                    const tags = [];
                    const tagsDB = await this.productDataBase.getTags(product.getId());
                    for (let tag of tagsDB) {
                        tags.push(tag.tag);
                    }
                    product.setTags(tags);
                }
                const response = {
                    products
                };
                return response;
            }
            const productsDB = await this.productDataBase.getProducts();
            const products = productsDB.map(productDB => {
                return new Products_1.Product(productDB.id, productDB.name);
            });
            for (let product of products) {
                const tags = [];
                const tagsDB = await this.productDataBase.getTags(product.getId());
                for (let tag of tagsDB) {
                    tags.push(tag.tag);
                }
                product.setTags(tags);
            }
            const response = {
                products
            };
            return response;
        };
        this.getProductsTags = async (input) => {
            const search = input.search;
            const tag = await this.productDataBase.getIdTag(search);
            const tagId = tag.map(item => item.id);
            const products = await this.productDataBase.getSearchProductsByTag(tagId[0]);
            if (products.length === 0) {
                throw new RequestError_1.RequestError("No products found with this search.");
            }
            const response = {
                products: products
            };
            return response;
        };
        this.postProduct = async (input) => {
            const name = input.name;
            const token = input.token;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Missing or invalid token.");
            }
            if (!name) {
                throw new RequestError_1.RequestError("Missing param.");
            }
            if (typeof name !== "string") {
                throw new RequestError_1.RequestError("Invalid name param.");
            }
            if (name.length < 1) {
                throw new RequestError_1.RequestError("Invalid name param.");
            }
            const id = this.idGenerator.generate();
            const newProduct = new Products_1.Product(id, name.toUpperCase());
            await this.productDataBase.postProduct(newProduct);
            const response = {
                message: "Product added successfully!"
            };
            return response;
        };
        this.addTag = async (input) => {
            const productId = input.id;
            const tagName = input.tagName;
            const token = input.token;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Missing or invalid token.");
            }
            if (!productId || typeof productId !== "string") {
                throw new RequestError_1.RequestError('Missing params: insert a valid product id.');
            }
            const searchProduct = await this.productDataBase.verifyProduct(productId);
            if (!searchProduct) {
                throw new NotFoundError_1.NotFoundError('Product not found.');
            }
            const findTag = await this.productDataBase.getIdTag(tagName);
            if (findTag.length === 0) {
                throw new NotFoundError_1.NotFoundError('Tag not found.');
            }
            const getTag = await this.productDataBase.getIdTag(tagName);
            const tagId = getTag.map(item => item.id);
            const findTagProduct = await this.productDataBase.verifyProductTag(productId, tagId[0]);
            if (findTagProduct.length !== 0) {
                throw new ConflictError_1.ConflictError("Tag already related to product.");
            }
            const id = this.idGenerator.generate();
            const tag = {
                id: id,
                product_id: productId,
                tag_id: tagId[0],
            };
            await this.productDataBase.addTag(tag);
            const response = {
                message: 'Tag added successfully!',
                yourTag: tag,
            };
            return response;
        };
    }
}
exports.ProductBusiness = ProductBusiness;
//# sourceMappingURL=ProductBusiness.js.map