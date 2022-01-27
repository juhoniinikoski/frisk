"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const BaseModel_1 = __importDefault(require("./BaseModel"));
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class LocationClass extends BaseModel_1.default {
}
exports.default = LocationClass;
LocationClass.idColumn = 'id';
LocationClass.tableName = 'locations';
LocationClass.relationMappings = {
    sports: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + '/LocationSport',
        join: {
            from: 'locations.id',
            to: 'location_sport.locationId'
        }
    },
};
exports.Location = LocationClass.bindKnex(knex_1.default);
