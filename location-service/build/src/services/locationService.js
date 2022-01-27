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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocation = exports.getLocations = void 0;
const Location_1 = require("../models/Location");
const uuid_1 = require("uuid");
const getLocations = () => __awaiter(void 0, void 0, void 0, function* () { return yield Location_1.Location.query(); });
exports.getLocations = getLocations;
const getLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Location_1.Location.query().findById(id).withGraphFetched('sports');
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.getLocation = getLocation;
const createLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = location;
        const existingLocation = yield Location_1.Location.query().where('name', name);
        if (existingLocation.length !== 0) {
            return false;
        }
        yield Location_1.Location.query().insertAndFetch(Object.assign(Object.assign({}, location), { id: (0, uuid_1.v4)() }));
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.createLocation = createLocation;
const updateLocation = (id, location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = location;
        const existingLocation = yield Location_1.Location.query()
            .where('name', name);
        if (existingLocation.length !== 0) {
            return false;
        }
        yield Location_1.Location.query().patchAndFetchById(id, location);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield Location_1.Location.query().findById(id).delete();
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
exports.deleteLocation = deleteLocation;
