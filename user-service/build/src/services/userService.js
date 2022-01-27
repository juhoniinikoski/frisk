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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const createPasswordHash = (password) => bcrypt_1.default.hash(password, 10);
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = body;
        const existingUser = yield User_1.User.query()
            .where('username', username)
            .orWhere('email', email);
        if (existingUser.length !== 0) {
            return false;
        }
        const passwordHash = yield createPasswordHash(password);
        yield User_1.User.query().insertAndFetch({
            username,
            password: passwordHash,
            id: (0, uuid_1.v4)(),
            email
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createUser = createUser;
const updateUser = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = body;
        const existingUser = yield User_1.User.query()
            .where('username', username)
            .orWhere('email', email);
        if (existingUser.length !== 0) {
            if (existingUser[0].id !== id) {
                console.log("ollaan");
                return false;
            }
        }
        yield User_1.User.query().patchAndFetchById(id, {
            username: username,
            email: email
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield User_1.User.query().findById(id).delete();
        if (res === 0) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.deleteUser = deleteUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield User_1.User.query().findById(id)
            .withGraphFetched('[followedUsers, savedEvents, savedSports, savedLocations]');
        if (!data) {
            return false;
        }
        const events = data.savedEvents.map(event => event.eventId);
        const locations = data.savedLocations.map(location => location.locationId);
        const sports = data.savedSports.map(sport => sport.sportId);
        return Object.assign(Object.assign({}, data), { savedEvents: events, savedLocations: locations, savedSports: sports });
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getUser = getUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield User_1.User.query(); });
exports.getUsers = getUsers;
