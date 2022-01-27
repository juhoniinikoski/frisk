"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const BaseModel_1 = __importDefault(require("./BaseModel"));
const knex_1 = __importDefault(require("../utils/knex"));
const objection_1 = require("objection");
class UserClass extends BaseModel_1.default {
}
UserClass.idColumn = 'id';
UserClass.tableName = 'users';
UserClass.relationMappings = {
    followedUsers: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: UserClass,
        join: {
            from: 'users.id',
            through: {
                // user_user is the join table.
                from: 'user_user.followerId',
                to: 'user_user.followingId'
            },
            to: 'users.id'
        }
    },
    savedEvents: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + '/UserEvent',
        join: {
            from: 'users.id',
            to: 'user_event.userId'
        }
    },
    savedSports: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + '/UserSport',
        join: {
            from: 'users.id',
            to: 'user_sport.userId'
        }
    },
    savedLocations: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: __dirname + '/UserLocation',
        join: {
            from: 'users.id',
            to: 'user_location.userId'
        }
    }
};
exports.default = UserClass;
exports.User = UserClass.bindKnex(knex_1.default);
