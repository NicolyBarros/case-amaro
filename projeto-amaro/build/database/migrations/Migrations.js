"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("../BaseDatabase");
const ProductDatabase_1 = require("../ProductDatabase");
const UserDatabase_1 = require("../UserDatabase");
const data_1 = require("./data");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.execute = async () => {
            try {
                console.log("Creating tables...");
                await this.createTables();
                console.log("Tables created successfully.");
                console.log("Populating tables...");
                await this.insertData();
                console.log("Tables populated successfully.");
                console.log("Migrations completed.");
            }
            catch (error) {
                console.log("FAILED! Error in migrations...");
                console.log(error.message);
            }
            finally {
                console.log("Ending connection...");
                BaseDatabase_1.BaseDatabase.connection.destroy();
                console.log("Connection closed graciously.");
            }
        };
        this.createTables = async () => {
            await BaseDatabase_1.BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_TAGS_PRODUCTS};
        DROP TABLE IF EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCTS};
        DROP TABLE IF EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_TAGS};
        DROP TABLE IF EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCTS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_TAGS}(
            id VARCHAR(255) PRIMARY KEY,
            tag VARCHAR(255) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_TAGS_PRODUCTS}(
            id VARCHAR(255) PRIMARY KEY,
            product_id VARCHAR(255) NOT NULL,
            tag_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (product_id) REFERENCES ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCTS}(id),
            FOREIGN KEY (tag_id) REFERENCES ${ProductDatabase_1.ProductDatabase.TABLE_TAGS}(id)
        );
        `);
        };
        this.insertData = async () => {
            await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.UserDatabase.TABLE_USERS)
                .insert(data_1.users);
            await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase_1.ProductDatabase.TABLE_PRODUCTS)
                .insert(data_1.products);
            await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase_1.ProductDatabase.TABLE_TAGS)
                .insert(data_1.tags);
            await BaseDatabase_1.BaseDatabase
                .connection(ProductDatabase_1.ProductDatabase.TABLE_TAGS_PRODUCTS)
                .insert(data_1.tagsProducts);
        };
    }
}
const migrations = new Migrations();
migrations.execute();
//# sourceMappingURL=Migrations.js.map