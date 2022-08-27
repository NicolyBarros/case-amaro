"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ShowDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toShowDBModel = async (show) => {
            const showDB = {
                id: show.getId(),
                band: show.getBand(),
                starts_at: show.getStartsAt()
            };
            return showDB;
        };
        this.verifyDate = async (date) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .select()
                .where({ starts_at: date });
            return result[0];
        };
        this.createShow = async (show) => {
            const showDB = await this.toShowDBModel(show);
            await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .insert(showDB);
        };
        this.getShows = async () => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .select();
            return result;
        };
        this.getTickets = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
                .select()
                .count("id")
                .where({ show_id: id });
            return result[0]["count(`id`)"];
        };
        this.verifyShow = async (id) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_SHOWS)
                .select()
                .where({ id });
            return result[0];
        };
        this.verifyTicketShow = async (id, idUser) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_TICKETS)
                .select()
                .where("id", "=", `${id}`)
                .andWhere("user_id", "=", `${idUser}`);
            return result[0];
        };
        this.verifyTicketShowBuy = async (id, idUser) => {
            const result = await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_TICKETS)
                .select()
                .where("show_id", "=", `${id}`)
                .andWhere("user_id", "=", `${idUser}`);
            return result[0];
        };
        this.newTicket = async (ticket) => {
            await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_TICKETS)
                .insert(ticket);
        };
        this.deleteTicket = async (id) => {
            await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase.TABLE_TICKETS)
                .delete()
                .where({ id });
        };
    }
}
exports.ShowDatabase = ShowDatabase;
ShowDatabase.TABLE_SHOWS = "Lama_Shows";
ShowDatabase.TABLE_TICKETS = "Lama_Tickets";
//# sourceMappingURL=ShowDatabase.js.map