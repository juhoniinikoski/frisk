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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("locations", () => {
    it("should return array of locations", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get("/locations")
            .expect(200)
            .expect('Content-Type', /json/);
        return expect(result.body.length).toBeDefined();
    }));
});
describe("location", () => {
    it("should return a location with correct id", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Nordis1234";
        const result = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`)
            .expect(200)
            .expect('Content-Type', /json/);
        return expect(result.body.name).toBe("Nordis");
    }));
    it("shouldn't return a location with incorrect id", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Nordis123456";
        return yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`)
            .expect(404);
    }));
    it("should create a new location named testilokaatio", () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            name: "testilokaatio",
            description: "testilokaation descriptioni",
            createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
        };
        const initial = yield (0, supertest_1.default)(app_1.default).get('/locations');
        yield (0, supertest_1.default)(app_1.default).post('/locations')
            .send(event)
            .set('Accept', 'application/json')
            .expect(201);
        const result = yield (0, supertest_1.default)(app_1.default).get('/locations');
        return expect(result.body.length).toBe(initial.body.length + 1);
    }));
    it("shouldn't create a new location if name is already taken", () => __awaiter(void 0, void 0, void 0, function* () {
        const event = {
            name: "Nordis",
            description: "testilokaation descriptioni",
            createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
        };
        const initial = yield (0, supertest_1.default)(app_1.default).get('/locations');
        yield (0, supertest_1.default)(app_1.default).post('/locations')
            .send(event)
            .set('Accept', 'application/json')
            .expect(404);
        const result = yield (0, supertest_1.default)(app_1.default).get('/locations');
        return expect(result.body.length).toBe(initial.body.length);
    }));
    it("should delete a location", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Myllypuro1234";
        const initial = yield (0, supertest_1.default)(app_1.default).get('/locations');
        yield (0, supertest_1.default)(app_1.default).delete(`/locations/${locationId}`)
            .set('Accept', 'application/json')
            .expect(204);
        const result = yield (0, supertest_1.default)(app_1.default).get('/locations');
        return expect(result.body.length).toBe(initial.body.length - 1);
    }));
    it("shouldn't delete a location as id doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Ogeli123456789";
        const initial = yield (0, supertest_1.default)(app_1.default).get('/locations');
        yield (0, supertest_1.default)(app_1.default).delete(`/locations/${locationId}`)
            .set('Accept', 'application/json')
            .expect(404);
        const result = yield (0, supertest_1.default)(app_1.default).get('/locations');
        return expect(result.body.length).toBe(initial.body.length);
    }));
    it("should update name of location", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Ogeli1234";
        const location = {
            name: "Ogelin urheilupuisto"
        };
        yield (0, supertest_1.default)(app_1.default).put(`/locations/${locationId}`)
            .send(location)
            .set('Accept', 'application/json')
            .expect(201);
        const result = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        expect(result.body.id).toBe(locationId);
        return expect(result.body.name).toBe(location.name);
    }));
    it("shouldn't update name of location if it's used", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Ogeli1234";
        const location = {
            name: "Nordis"
        };
        yield (0, supertest_1.default)(app_1.default).put(`/locations/${locationId}`)
            .send(location)
            .set('Accept', 'application/json')
            .expect(404);
        const result = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        expect(result.body.id).toBe(locationId);
        return expect(result.body.name).toBe("Ogelin urheilupuisto");
    }));
});
describe("location attributes", () => {
    it("should add a sport to location", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Ogeli1234";
        const sportId = "6";
        const initial = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        yield (0, supertest_1.default)(app_1.default).post(`/locations/${locationId}/sports`)
            .send({ sportId })
            .set('Accept', 'application/json')
            .expect(201);
        const result = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        return expect(result.body.sports.length).toBe(initial.body.sports.length + 1);
    }));
    it("should remove a sport from location", () => __awaiter(void 0, void 0, void 0, function* () {
        const locationId = "Ogeli1234";
        const sportId = "6";
        const initial = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        yield (0, supertest_1.default)(app_1.default).post(`/locations/${locationId}/sports`)
            .send({ sportId })
            .set('Accept', 'application/json')
            .expect(201);
        const result = yield (0, supertest_1.default)(app_1.default).get(`/locations/${locationId}`);
        return expect(result.body.sports.length).toBe(initial.body.sports.length - 1);
    }));
});
