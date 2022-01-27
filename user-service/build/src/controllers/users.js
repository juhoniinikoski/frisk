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
const express_1 = __importDefault(require("express"));
const followService_1 = require("../services/followService");
const userService_1 = require("../services/userService");
const usersRouter = express_1.default.Router();
usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, userService_1.getUsers)();
    return res.json(result);
}));
usersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield (0, userService_1.createUser)(user);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, userService_1.getUser)(id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.json(result);
}));
usersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield (0, userService_1.updateUser)(id, body);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(201);
}));
usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, userService_1.deleteUser)(id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
}));
usersRouter.post("/:id/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const eventId = req.body.eventId;
    const result = yield (0, followService_1.saveEvent)(userId, eventId);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
usersRouter.post("/:id/locations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const locationId = req.body.locationId;
    const result = yield (0, followService_1.saveLocation)(userId, locationId);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
usersRouter.post("/:id/sports", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const sportId = req.body.sportId;
    const result = yield (0, followService_1.saveSport)(userId, sportId);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
usersRouter.post("/:id/follow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const followedId = req.body.followingId;
    const result = yield (0, followService_1.followUser)(userId, followedId);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
exports.default = usersRouter;
