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
exports.addSport = void 0;
const LocationSport_1 = require("../models/LocationSport");
const addSport = (locationId, sportId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFollow = yield LocationSport_1.LocationSport.query().where({
            locationId: locationId,
            sportId: sportId,
        });
        // Delete the follow
        if (alreadyFollow.length !== 0) {
            yield LocationSport_1.LocationSport.query()
                .where({
                locationId: locationId,
                sportId: sportId,
            })
                .delete();
            return true;
        }
        yield LocationSport_1.LocationSport.query().insertAndFetch({
            locationId: locationId,
            sportId: sportId,
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.addSport = addSport;
