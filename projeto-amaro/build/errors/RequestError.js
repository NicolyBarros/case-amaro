"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestError = void 0;
const BaseError_1 = require("./BaseError");
class RequestError extends BaseError_1.BaseError {
    constructor(message = "Requisição inválida") {
        super(400, message);
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=RequestError.js.map