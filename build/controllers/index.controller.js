"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const migrations_1 = __importDefault(require("../services/migrations"));
class IndexController {
    constructor() {
        this.migrationsService = new migrations_1.default();
        this.index = async (req, res, next) => {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
        this.runMigrations = async (req, res, next) => {
            try {
                const out = await this.migrationsService.runMigrations();
                res.status(200).json({ data: out });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map