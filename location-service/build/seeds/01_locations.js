"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const oneHour = 1000 * 60 * 60;
const createDateColumns = (date) => ({
    created_at: date,
    updated_at: date,
});
const createColumns = (locationName) => ({
    id: `${locationName}1234`,
    name: locationName,
    description: "Testilokaatio",
    created_by_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
    address: JSON.stringify({
        id: 1,
        street: 'Testitienpolku 1',
        zipcode: '00100',
        city: 'Helsinki',
        country: 'Finland'
    }),
});
exports.seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex('locations').del();
    yield knex('locations').insert([
        Object.assign(Object.assign({}, createColumns('Ogeli')), createDateColumns(new Date(Date.now() - oneHour))),
        Object.assign(Object.assign({}, createColumns('Nordis')), createDateColumns(new Date(Date.now() - 2 * oneHour))),
        Object.assign(Object.assign({}, createColumns('Myllypuro')), createDateColumns(new Date(Date.now() - 3 * oneHour))),
    ]);
});
