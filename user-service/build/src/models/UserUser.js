"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUser = void 0;
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class UserUserClass extends objection_1.Model {
}
exports.default = UserUserClass;
UserUserClass.idColumn = 'id';
UserUserClass.tableName = 'user_user';
exports.UserUser = UserUserClass.bindKnex(knex_1.default);
