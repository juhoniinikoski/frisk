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
describe("users", () => {
    describe("quering for users", () => {
        it("should return array of users", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertest_1.default)(app_1.default).get('/users')
                .expect(200)
                .expect('Content-Type', /json/);
            return expect(result.body.length).toBeDefined();
        }));
    });
});
describe("user", () => {
    describe("given the user does not exist", () => {
        it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = "user-123";
            yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`).expect(404);
        }));
    });
    describe("given the user with correct id", () => {
        it("should return one user", () => __awaiter(void 0, void 0, void 0, function* () {
            const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`)
                .expect(200)
                .expect('Content-Type', /json/);
            return expect(result.body.username).toBe("juhoniinikoski");
        }));
    });
    describe("creating user succesfully", () => {
        it("should create one user succesfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: "juhoniinikoski4",
                email: "testi9@gmail.com",
                password: "password"
            };
            return yield (0, supertest_1.default)(app_1.default).post('/users')
                .send(user)
                .set('Accept', 'application/json')
                .expect(201);
        }));
    });
    describe("updating user attributes", () => {
        const userId = "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f";
        it("should update one user succesfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: "juhoniinikoski12",
                email: "testi112@gmail.com"
            };
            return yield (0, supertest_1.default)(app_1.default).put(`/users/${userId}`)
                .send(user)
                .set('Accept', 'application/json')
                .expect(201);
        }));
        it("shouldn't update user if username is occupied", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: "juhoniinikoski",
                email: "testi112@gmail.com"
            };
            return yield (0, supertest_1.default)(app_1.default).put(`/users/${userId}`)
                .send(user)
                .set('Accept', 'application/json')
                .expect(404);
        }));
    });
    describe("creating user fails", () => {
        it("should not create user due to un-unique username", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: "juhoniinikoski",
                email: "testi20@gmail.com",
                password: "password"
            };
            return yield (0, supertest_1.default)(app_1.default).post('/users')
                .send(user)
                .set('Accept', 'application/json')
                .expect(400);
        }));
        it("should not create user due to un-unique email", () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                username: "juhoniinikoski20",
                email: "testi1@gmail.com",
                password: "password"
            };
            return yield (0, supertest_1.default)(app_1.default).post('/users')
                .send(user)
                .set('Accept', 'application/json')
                .expect(400);
        }));
    });
});
describe("saved attributes", () => {
    describe("followed users", () => {
        const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
        const followingId = "753f3e99-e73a-43a3-9a50-b30d7727c0eb";
        it("should follow a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/follow`)
                .send({ followingId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.followedUsers.length).toBe(initial.body.followedUsers.length + 1);
        }));
        it("should un-follow a user", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/follow`)
                .send({ followingId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.followedUsers.length).toBe(initial.body.followedUsers.length - 1);
        }));
    });
    describe("events", () => {
        const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
        const eventId = "johnDoe.Testievent";
        it("should save an event", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/events`)
                .send({ eventId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedEvents.length).toBe(initial.body.savedEvents.length + 1);
        }));
        it("should un-save an event", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/events`)
                .send({ eventId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedEvents.length).toBe(initial.body.savedEvents.length - 1);
        }));
    });
    describe("locations", () => {
        const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
        const locationId = "Oulunkylän urheilupuisto1234";
        it("should save a location", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/locations`)
                .send({ locationId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedLocations.length).toBe(initial.body.savedLocations.length + 1);
        }));
        it("should un-save a location", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/locations`)
                .send({ locationId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedLocations.length).toBe(initial.body.savedLocations.length - 1);
        }));
    });
    describe("sports", () => {
        const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
        const sportId = "3";
        it("should save a sport", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/sports`)
                .send({ sportId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedSports.length).toBe(initial.body.savedSports.length + 1);
        }));
        it("sends sport to wrong address -> returns 400", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/locations`)
                .send({ sportId })
                .expect(400);
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedSports.length).toBe(initial.body.savedSports.length);
        }));
        it("should un-save a sport", () => __awaiter(void 0, void 0, void 0, function* () {
            const initial = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            yield (0, supertest_1.default)(app_1.default).post(`/users/${userId}/sports`)
                .send({ sportId });
            const result = yield (0, supertest_1.default)(app_1.default).get(`/users/${userId}`);
            return expect(result.body.savedSports.length).toBe(initial.body.savedSports.length - 1);
        }));
    });
});