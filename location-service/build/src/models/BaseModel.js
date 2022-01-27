"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueryBuilder = void 0;
const objection_1 = require("objection");
/* eslint-disable */
class BaseQueryBuilder extends objection_1.QueryBuilder {
}
exports.BaseQueryBuilder = BaseQueryBuilder;
class BaseModel extends objection_1.Model {
    static relatedQuery(str, trx) {
        return super.relatedQuery(str, trx);
    }
    $beforeInsert() {
        if (!this.createdAt) {
            this.createdAt = new Date();
        }
    }
    $beforeUpdate() {
        if (!this.updatedAt) {
            this.updatedAt = new Date();
        }
    }
}
BaseModel.QueryBuilder = BaseQueryBuilder;
BaseModel.useLimitInFirst = true;
exports.default = BaseModel;
