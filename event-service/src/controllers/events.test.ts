import supertest from "supertest";
import app from "../app";
import EventClass from "../models/Event";

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

describe("events", () => {

  describe("quering for events", () => {
    it("should return array of events", async () => {

      const result = await supertest(app).get('/events')
        .expect(200)
        .expect('Content-Type', /json/);

      return expect(result.body.length).toBeDefined();
    });
  });
  
  describe("quering for events with sport as filter", () => {
    it("should return array of events", async () => {

      const sportId = "1";

      const result = await supertest(app).get(`/events?sport=${sportId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(result.body.length).toBeDefined();
      return result.body.forEach((body: any) => {
        expect(body.sportId).toBe(sportId);
      });
    });
  });
  
  describe("quering for events with location as filter", () => {
    it("should return array of events", async () => {

      const locationId = "Nordis1234";

      const result = await supertest(app).get(`/events?location=${locationId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(result.body.length).toBeDefined();
      return result.body.forEach((body: any) => {
        expect(body.locationId).toBe(locationId);
      });
    });
  });
  
  describe("quering for events with user as filter", () => {
    it("should return array of events", async () => {

      const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";

      const result = await supertest(app).get(`/events?user=${userId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(result.body.length).toBeDefined();
      return result.body.forEach((body: any) => {
        expect(body.createdById).toBe(userId);
      });
    });
  });

  describe("quering for events with location, sport and user as filter", () => {
    it("should return array of events", async () => {

      const locationId = "Nordis1234";
      const sportId = "2";
      const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";

      const result = await supertest(app).get(`/events?location=${locationId}&sport=${sportId}&user=${userId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(result.body.length).toBeDefined();
    
      result.body.forEach((body: any) => {
        expect(body.sportId).toBe(sportId);
      });
      
      result.body.forEach((body: any) => {
        expect(body.createdById).toBe(userId);
      });

      return result.body.forEach((body: any) => {
        expect(body.locationId).toBe(locationId);
      });
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
    it("should create one event succesfully", async () => {
      
      const event: Partial<EventClass> = {
        name: "testin tekemä event",
        description: "huippudescriptioni",
        locationId: "lokaatioId",
        sportId: "1",
        createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f",
        free: true,
        price: 0,
        repetition: "SINGLE",
        start: Date.now() / 1000,
        end: (Date.now() + 1000 * 60 * 60) / 1000
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

describe("event attributes", () => {

  it("should add a user to event", async () => {

    const userId = "753f3e99-e73a-43a3-9a50-b30d7727c0eb";
    const eventId = "juhoniinikoski.Pihapelit";
    const initial = await supertest(app).get(`/events/${eventId}/test`);

    await supertest(app).post(`/events/${eventId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/events/${eventId}/test`);
    return expect(result.body.savedBy.length).toBe(initial.body.savedBy.length + 1);

  });
  
  it("should remove a user from event", async () => {

    const userId = "753f3e99-e73a-43a3-9a50-b30d7727c0eb";
    const eventId = "juhoniinikoski.Pihapelit";
    const initial = await supertest(app).get(`/events/${eventId}/test`);

    await supertest(app).post(`/events/${eventId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
      const result = await supertest(app).get(`/events/${eventId}/test`);
      return expect(result.body.savedBy.length).toBe(initial.body.savedBy.length - 1);

  });

});