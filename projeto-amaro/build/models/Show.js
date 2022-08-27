"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
class Show {
    constructor(id, band, startsAt, tickets = 5000) {
        this.id = id;
        this.band = band;
        this.startsAt = startsAt;
        this.tickets = tickets;
        this.getId = () => {
            return this.id;
        };
        this.getBand = () => {
            return this.band;
        };
        this.getStartsAt = () => {
            return this.startsAt;
        };
        this.getTickets = () => {
            return this.tickets;
        };
        this.setId = (newId) => {
            this.id = newId;
        };
        this.setBand = (newBand) => {
            this.band = newBand;
        };
        this.setStartsAt = (newStartsAt) => {
            this.startsAt = newStartsAt;
        };
        this.setTickets = (newTickets) => {
            this.tickets = newTickets;
        };
    }
}
exports.Show = Show;
//# sourceMappingURL=Show.js.map