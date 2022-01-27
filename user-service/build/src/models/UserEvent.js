"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class UserEventClass extends objection_1.Model {
}
exports.default = UserEventClass;
UserEventClass.idColumn = 'id';
UserEventClass.tableName = 'user_event';
exports.UserEvent = UserEventClass.bindKnex(knex_1.default);
