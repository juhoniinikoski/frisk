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
// Super secret password is "password"
const password = '$2b$10$i6OAqjuT7noL/PrsctZQ7O8FkrZ1Ml9RBHx2ro9PY3hqa2OcW5Ah2';
const commonColumns = {
    password
};
exports.seed = (knex) => __awaiter(void 0, void 0, void 0, function* () {
    yield knex('users').del();
    yield knex('users').insert([
        Object.assign(Object.assign({ id: 'bbe42984-051b-4a01-b45d-b8d29c32200c', username: 'juhoniinikoski', email: 'testi1@gmail.com' }, commonColumns), createDateColumns(new Date(Date.now() - oneHour))),
        Object.assign(Object.assign({ id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', username: 'mattimeikalainen', email: 'testi2@gmail.com' }, commonColumns), createDateColumns(new Date(Date.now() - 2 * oneHour))),
        Object.assign(Object.assign({ id: '1b10e4d8-57ee-4d00-8886-e4a049d7ff8f', username: 'maijameikalainen', email: 'testi3@gmail.com' }, commonColumns), createDateColumns(new Date(Date.now() - 3 * oneHour))),
        Object.assign(Object.assign({ id: '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f', username: 'johndoe', email: 'testi4@gmail.com' }, commonColumns), createDateColumns(new Date(Date.now() - 4 * oneHour))),
        Object.assign(Object.assign({ id: '753f3e99-e73a-43a3-9a50-b30d7727c0eb', username: 'leeroyjenkins', email: 'testi5@gmail.com' }, commonColumns), createDateColumns(new Date(Date.now() - 5 * oneHour))),
    ]);
});
