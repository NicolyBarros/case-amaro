"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
const RequestError_1 = require("../errors/RequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(userDatabase, idGenerator, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.signup = async (input) => {
            const { name, email, password } = input;
            if (!name || !email || !password) {
                throw new RequestError_1.RequestError("Missing parameters.");
            }
            if (typeof name !== "string") {
                throw new RequestError_1.RequestError("Invalid 'name' parameter: must be a string.");
            }
            if (typeof email !== "string") {
                throw new RequestError_1.RequestError("Invalid 'email' parameter: must be a string.");
            }
            if (typeof password !== "string") {
                throw new RequestError_1.RequestError("Invalid 'password' parameter: must be a string.");
            }
            if (name.length < 3) {
                throw new RequestError_1.RequestError("Invalid 'name' parameter: minimum 3 characters.");
            }
            if (password.length < 6) {
                throw new RequestError_1.RequestError("Invalid 'password' parameter: minimum 6 characters.");
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new RequestError_1.RequestError("Invalid 'email' parameter.");
            }
            const findUserByEmail = await this.userDatabase.findByEmail(email);
            if (findUserByEmail) {
                throw new ConflictError_1.ConflictError("E-mail already registered.");
            }
            const id = this.idGenerator.generate();
            const hashedPassword = await this.hashManager.hash(password);
            const user = new User_1.User(id, name, email, hashedPassword, User_1.USER_ROLES.NORMAL);
            await this.userDatabase.createUser(user);
            const payload = {
                id: user.getId(),
                role: user.getRole()
            };
            const token = this.authenticator.generateToken(payload);
            const response = {
                message: "Successfully registered!",
                token
            };
            return response;
        };
        this.login = async (input) => {
            const { email, password } = input;
            if (!email || !password) {
                throw new RequestError_1.RequestError("Missing parameters.");
            }
            if (typeof email !== "string") {
                throw new RequestError_1.RequestError("Invalid 'email' parameter: must be a string.");
            }
            if (typeof password !== "string") {
                throw new RequestError_1.RequestError("Invalid 'password' parameter: must be a string.");
            }
            if (password.length < 6) {
                throw new RequestError_1.RequestError("Invalid 'password' parameter: minimum 6 characters.");
            }
            if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                throw new RequestError_1.RequestError("Invalid 'email' parameter.");
            }
            const findUserByEmail = await this.userDatabase.findByEmail(email);
            if (!findUserByEmail) {
                throw new NotFoundError_1.NotFoundError("Email not registered.");
            }
            const user = new User_1.User(findUserByEmail.id, findUserByEmail.name, findUserByEmail.email, findUserByEmail.password, findUserByEmail.role);
            const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());
            if (!isPasswordCorrect) {
                throw new UnauthorizedError_1.UnauthorizedError("Incorrect password.");
            }
            const payload = {
                id: user.getId(),
                role: user.getRole()
            };
            const token = this.authenticator.generateToken(payload);
            const response = {
                message: "Login successfully!",
                token
            };
            return response;
        };
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map