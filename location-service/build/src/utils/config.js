"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNEX_CONFIG = exports.JWT_SECRET = exports.PORT = void 0;
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("../../knexfile"));
const environment = process.env.NODE_ENV || 'development';
const knex = environment === 'test' ? knexfile_1.default.test : knexfile_1.default.development;
exports.PORT = process.env.PORT || 4000;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.KNEX_CONFIG = Object.assign(Object.assign({}, knex), (0, objection_1.knexSnakeCaseMappers)());
