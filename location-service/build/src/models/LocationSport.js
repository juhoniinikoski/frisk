"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationSport = void 0;
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class LocationSportClass extends objection_1.Model {
}
exports.default = LocationSportClass;
LocationSportClass.idColumn = 'id';
LocationSportClass.tableName = 'location_sport';
exports.LocationSport = LocationSportClass.bindKnex(knex_1.default);
