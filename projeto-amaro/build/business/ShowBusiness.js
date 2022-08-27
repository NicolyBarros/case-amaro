"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowBusiness = void 0;
const ConflictError_1 = require("../errors/ConflictError");
const NotFoundError_1 = require("../errors/NotFoundError");
const RequestError_1 = require("../errors/RequestError");
const UnauthorizedError_1 = require("../errors/UnauthorizedError");
const Show_1 = require("../models/Show");
const User_1 = require("../models/User");
class ShowBusiness {
    constructor(showDatabase, idGenerator, hashManager, authenticator) {
        this.showDatabase = showDatabase;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
        this.createShow = async (input) => {
            const { token, band, startAt } = input;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token ausente/inválido.");
            }
            if (!band || !startAt) {
                throw new RequestError_1.RequestError("Parâmetros ausentes.");
            }
            if (typeof band !== "string") {
                throw new RequestError_1.RequestError("Parâmetro 'band' inválido: deve ser uma string.");
            }
            if (typeof startAt !== "string") {
                throw new RequestError_1.RequestError("Parâmetro 'band' inválido: deve ser uma string.");
            }
            if (payload.role === User_1.USER_ROLES.NORMAL) {
                throw new UnauthorizedError_1.UnauthorizedError("Somente admins podem acessar esse recurso.");
            }
            const busyDate = await this.showDatabase.verifyDate(new Date(startAt));
            if (busyDate) {
                throw new RequestError_1.RequestError("Data de show ocupada.");
            }
            if (startAt > "2022/12/11") {
                throw new RequestError_1.RequestError("Data de show inválida, não pode ultrapassar dia 11 de dezembro.");
            }
            if (startAt < "2022/12/05") {
                throw new RequestError_1.RequestError("Data de show inválida, não pode anteceder dia 05 de dezembro.");
            }
            const id = this.idGenerator.generate();
            const show = new Show_1.Show(id, band, new Date(startAt));
            await this.showDatabase.createShow(show);
            const response = {
                message: "Show cadastrado com sucesso!",
                show
            };
            return response;
        };
        this.getShows = async () => {
            const showsDB = await this.showDatabase.getShows();
            const shows = showsDB.map(showDB => {
                return new Show_1.Show(showDB.id, showDB.band, showDB.starts_at);
            });
            for (let show of shows) {
                const tickets = await this.showDatabase.getTickets(show.getId());
                show.setTickets(show.getTickets() - Number(tickets));
            }
            const response = {
                shows
            };
            return response;
        };
        this.buyTicket = async (input) => {
            const { token, showId } = input;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token ausente/inválido.");
            }
            if (!showId) {
                throw new RequestError_1.RequestError("Parâmetros ausentes.");
            }
            if (typeof showId !== "string") {
                throw new RequestError_1.RequestError("Parâmetro 'showId' inválido: deve ser uma string.");
            }
            const findShow = await this.showDatabase.verifyShow(showId);
            if (!findShow) {
                throw new NotFoundError_1.NotFoundError("Show não encontrado.");
            }
            const findTicket = await this.showDatabase.verifyTicketShowBuy(showId, payload.id);
            if (findTicket) {
                throw new ConflictError_1.ConflictError("Você já comprou ingresso para esse show.");
            }
            const shows = await this.getShows();
            const [ticketsShow] = shows.shows.filter((show) => {
                return show.id === showId;
            });
            if (ticketsShow.getTickets() < 1) {
                throw new RequestError_1.RequestError("Ingressos esgotados.");
            }
            const id = this.idGenerator.generate();
            const ticket = {
                id: id,
                show_id: showId,
                user_id: payload.id
            };
            await this.showDatabase.newTicket(ticket);
            const response = {
                message: "Ingresso comprado com sucesso!"
            };
            return response;
        };
        this.deleteTicket = async (input) => {
            const { token, ticketId } = input;
            const payload = this.authenticator.getTokenPayload(token);
            if (!payload) {
                throw new UnauthorizedError_1.UnauthorizedError("Token ausente/inválido.");
            }
            if (!ticketId) {
                throw new RequestError_1.RequestError("Parâmetros ausentes.");
            }
            const findTicket = await this.showDatabase.verifyTicketShow(ticketId, payload.id);
            if (!findTicket) {
                throw new NotFoundError_1.NotFoundError("Você não comprou ingresso para esse show.");
            }
            if (payload.role === User_1.USER_ROLES.NORMAL) {
                if (payload.id !== findTicket.user_id) {
                    throw new Error("Somente admins podem deletar ingressos de outros usuários.");
                }
            }
            await this.showDatabase.deleteTicket(ticketId);
            const response = {
                message: "Ingresso deletado com sucesso!"
            };
            return response;
        };
    }
}
exports.ShowBusiness = ShowBusiness;
//# sourceMappingURL=ShowBusiness.js.map