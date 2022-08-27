"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getProducts = async () => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)
                .select();
            return result;
        };
        this.getProductsBySearch = async (search) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)
                .select()
                .where("id", "LIKE", `%${search}%`)
                .orWhere("name", "LIKE", `%${search}%`);
            return result;
        };
        this.getSearchProductsByTag = async (search) => {
            const result = await BaseDatabase_1.BaseDatabase.connection.raw(`
        SELECT Amaro_Products.id,Amaro_Products.name
        FROM Amaro_Tags_Products
        JOIN Amaro_Tags
        ON Amaro_Tags_Products.tag_id = Amaro_Tags.id
        JOIN Amaro_Products
        ON Amaro_Tags_Products.product_id = Amaro_Products.id
        WHERE Amaro_Tags_Products.tag_id = "${search}";`);
            return result[0];
        };
        this.getIdTag = async (tag) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_TAGS)
                .select()
                .where({ tag });
            return result;
        };
        this.getTags = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection.raw(`
        SELECT Amaro_Tags.tag
        FROM Amaro_Tags_Products
        JOIN Amaro_Tags
        ON Amaro_Tags_Products.tag_id = Amaro_Tags.id
        WHERE Amaro_Tags_Products.product_id = "${id}";`);
            return result[0];
        };
        this.toProductDBModel = async (product) => {
            const productDB = {
                id: product.getId(),
                name: product.getName()
            };
            return productDB;
        };
        this.postProduct = async (product) => {
            const productDB = await this.toProductDBModel(product);
            await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)
                .insert(productDB);
        };
        this.addTag = async (tag) => {
            await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_TAGS_PRODUCTS)
                .insert(tag);
        };
        this.verifyProduct = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_PRODUCTS)
                .select()
                .where({ id });
            return result[0];
        };
        this.verifyProductTag = async (id, tag) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase.TABLE_TAGS_PRODUCTS)
                .select()
                .where("product_id", "=", `${id}`)
                .andWhere("tag_id", "=", `${tag}`);
            return result;
        };
    }
}
exports.ProductDatabase = ProductDatabase;
ProductDatabase.TABLE_PRODUCTS = "Amaro_Products";
ProductDatabase.TABLE_TAGS = "Amaro_Tags";
ProductDatabase.TABLE_TAGS_PRODUCTS = "Amaro_Tags_Products";
//# sourceMappingURL=ProductDatabase.js.map