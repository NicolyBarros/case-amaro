"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRouter = void 0;
const express_1 = require("express");
const ShowBusiness_1 = require("../business/ShowBusiness");
const ShowController_1 = require("../controller/ShowController");
const ShowDatabase_1 = require("../database/ShowDatabase");
const Authenticator_1 = require("../services/Authenticator");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
exports.showRouter = (0, express_1.Router)();
const showController = new ShowController_1.ShowController(new ShowBusiness_1.ShowBusiness(new ShowDatabase_1.ShowDatabase(), new IdGenerator_1.IdGenerator(), new HashManager_1.HashManager(), new Authenticator_1.Authenticator()));
exports.showRouter.post("/", showController.createShow);
exports.showRouter.get("/", showController.getShows);
exports.showRouter.post("/ticket/:id", showController.buyTicket);
exports.showRouter.delete("/ticket/:id", showController.deleteTicket);
//# sourceMappingURL=showRouter.js.map