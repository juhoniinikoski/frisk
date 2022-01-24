import supertest from "supertest";
import app from "../app";
import EventClass from "../models/Event";

describe("users", () => {

  describe("quering for events", () => {
    it("should return array of events", async () => {

      const result = await supertest(app).get('/events')
        .expect(200)
        .expect('Content-Type', /json/);

      return expect(result.body.length).toBeDefined();
    });
  });

});


describe("event", () => {

  describe("given the event does not exist", () => {
    it("should return a 404", async () => {
      const eventId = "event-123";

      await supertest(app).get(`/events/${eventId}`).expect(404);
    });
  });

  describe("given the event with correct id", () => {
    it("should return one event", async () => {
      const eventId = "juhoniinikoski.Pihapelit";

      const result = await supertest(app).get(`/events/${eventId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      return expect(result.body.name).toBe("Pihapelit");
    });
  });

  describe("creating event succesfully", () => {
    it("should create one user succesfully", async () => {
      
      const event: Partial<EventClass> = {
        name: "testin tekemä event",
        description: "huippudescriptioni",
        locationId: "lokaatioId",
        sportId: "1",
        createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
      };

      return await supertest(app).post('/events')
      .send(event)
      .set('Accept', 'application/json')
      .expect(201);
    });
  });

  describe("updating event attributes", () => {
    
    const eventId = "juhoniinikoski.Pihapelit2";
    
    it("should update one event succesfully", async () => {
      
      const event: Partial<EventClass> = {
        name: "juhon testievent",
        description: "testi112@gmail.com"
      };

      return await supertest(app).put(`/events/${eventId}`)
        .send(event)
        .set('Accept', 'application/json')
        .expect(201);
    });

  });

  describe("deleting event", () => {
    
    const eventId = "juhoniinikoski.Pihapelit2";
    
    it("should delete one event succesfully", async () => {

      return await supertest(app).delete(`/events/${eventId}`)
        .set('Accept', 'application/json')
        .expect(204);
    });

    it("shouldn't delete event that doesn't exist", async () => {

      return await supertest(app).delete('/events/12345678')
        .set('Accept', 'application/json')
        .expect(404);
    });

  });

});