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
exports.saveSport = exports.saveLocation = exports.saveEvent = exports.followUser = void 0;
const UserEvent_1 = require("../models/UserEvent");
const UserLocation_1 = require("../models/UserLocation");
const UserSport_1 = require("../models/UserSport");
const UserUser_1 = require("../models/UserUser");
const followUser = (followerId, followingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFollow = yield UserUser_1.UserUser.query().where({
            followerId: followerId,
            followingId: followingId
        });
        // Delete the follow
        if (alreadyFollow.length !== 0) {
            yield UserUser_1.UserUser.query()
                .where({
                followerId: followerId,
                followingId: followingId
            })
                .delete();
            return true;
        }
        yield UserUser_1.UserUser.query().insertAndFetch({
            followerId: followerId,
            followingId: followingId
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.followUser = followUser;
const saveEvent = (userId, eventId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFollow = yield UserEvent_1.UserEvent.query().where({
            userId: userId,
            eventId: eventId,
        });
        // Delete the follow
        if (alreadyFollow.length !== 0) {
            yield UserEvent_1.UserEvent.query()
                .where({
                userId: userId,
                eventId: eventId,
            })
                .delete();
            return true;
        }
        yield UserEvent_1.UserEvent.query().insertAndFetch({
            userId: userId,
            eventId: eventId,
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.saveEvent = saveEvent;
const saveLocation = (userId, locationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFollow = yield UserLocation_1.UserLocation.query().where({
            userId: userId,
            locationId: locationId,
        });
        // Delete the follow
        if (alreadyFollow.length !== 0) {
            yield UserLocation_1.UserLocation.query()
                .where({
                userId: userId,
                locationId: locationId,
            })
                .delete();
            return true;
        }
        yield UserLocation_1.UserLocation.query().insertAndFetch({
            userId: userId,
            locationId: locationId,
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.saveLocation = saveLocation;
const saveSport = (userId, sportId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alreadyFollow = yield UserSport_1.UserSport.query().where({
            userId: userId,
            sportId: sportId,
        });
        // Delete the follow
        if (alreadyFollow.length !== 0) {
            yield UserSport_1.UserSport.query()
                .where({
                userId: userId,
                sportId: sportId,
            })
                .delete();
            return true;
        }
        yield UserSport_1.UserSport.query().insertAndFetch({
            userId: userId,
            sportId: sportId,
        });
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.saveSport = saveSport;
