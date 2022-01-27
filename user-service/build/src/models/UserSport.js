"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSport = void 0;
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class UserSportClass extends objection_1.Model {
}
exports.default = UserSportClass;
UserSportClass.idColumn = 'id';
UserSportClass.tableName = 'user_sport';
exports.UserSport = UserSportClass.bindKnex(knex_1.default);
