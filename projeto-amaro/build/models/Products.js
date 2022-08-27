"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, tags = []) {
        this.id = id;
        this.name = name;
        this.tags = tags;
        this.getId = () => {
            return this.id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getTags = () => {
            return this.tags;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setTags = (newTag) => {
            this.tags = newTag;
        };
    }
}
exports.Product = Product;
//# sourceMappingURL=Products.js.map