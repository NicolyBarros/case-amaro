"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowController = void 0;
const BaseError_1 = require("../errors/BaseError");
class ShowController {
    constructor(showBusiness) {
        this.showBusiness = showBusiness;
        this.createShow = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    band: req.body.band,
                    startAt: req.body.startAt
                };
                const response = await this.showBusiness.createShow(input);
                res.status(201).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado ao cadastrar show." });
            }
        };
        this.getShows = async (req, res) => {
            try {
                const response = await this.showBusiness.getShows();
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado ao buscar todos os shows." });
            }
        };
        this.buyTicket = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    showId: req.params.id
                };
                const response = await this.showBusiness.buyTicket(input);
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado ao comprar ingresso do show." });
            }
        };
        this.deleteTicket = async (req, res) => {
            try {
                const input = {
                    token: req.headers.authorization,
                    ticketId: req.params.id
                };
                const response = await this.showBusiness.deleteTicket(input);
                res.status(200).send(response);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado ao deletar ingresso do show." });
            }
        };
    }
}
exports.ShowController = ShowController;
//# sourceMappingURL=ShowController.js.map