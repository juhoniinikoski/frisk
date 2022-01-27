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
const addService_1 = require("../services/addService");
const locationService_1 = require("../services/locationService");
const locationRouter = express_1.default.Router();
locationRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, locationService_1.getLocations)();
    if (!result) {
        return res.sendStatus(404);
    }
    return res.json(result);
}));
locationRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, locationService_1.getLocation)(id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.json(result);
}));
locationRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const location = req.body;
    const result = yield (0, locationService_1.createLocation)(location);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(201);
}));
locationRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const location = req.body;
    const result = yield (0, locationService_1.updateLocation)(id, location);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(201);
}));
locationRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, locationService_1.deleteLocation)(id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
}));
locationRouter.post("/:id/sports", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const locationId = req.params.id;
    const sportId = req.body.sportId;
    const result = yield (0, addService_1.addSport)(locationId, sportId);
    if (!result) {
        return res.sendStatus(400);
    }
    return res.sendStatus(201);
}));
exports.default = locationRouter;
