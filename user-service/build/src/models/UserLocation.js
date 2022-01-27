"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLocation = void 0;
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class UserLocationClass extends objection_1.Model {
}
exports.default = UserLocationClass;
UserLocationClass.idColumn = 'id';
UserLocationClass.tableName = 'user_location';
exports.UserLocation = UserLocationClass.bindKnex(knex_1.default);
