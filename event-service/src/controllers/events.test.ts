import supertest from "supertest";
import app from "../app";
import EventClass from "../models/Event";

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

describe("events", () => {
  
  it("should return array of events", async () => {

    const result = await supertest(app).get('/events')
      .expect(200)
      .expect('Content-Type', /json/);

    return expect(result.body.length).toBeDefined();
  });
  
  it("should return array of events with sport as a filter", async () => {

    const sportId = "1";

    const result = await supertest(app).get(`/events?sport=${sportId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result.body.length).toBeDefined();
    return result.body.forEach((body: any) => {
      expect(body.sportId).toBe(sportId);
    });
  });
  
  it("should return array of events with location as a filter", async () => {

    const locationId = "Nordis1234";

    const result = await supertest(app).get(`/events?location=${locationId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result.body.length).toBeDefined();
    return result.body.forEach((body: any) => {
      expect(body.locationId).toBe(locationId);
    });
  });
  
  it("should return array of events with user as a filter", async () => {

    const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";

    const result = await supertest(app).get(`/events?user=${userId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(result.body.length).toBeDefined();
    return result.body.forEach((body: any) => {
      expect(body.createdById).toBe(userId);
    });
  });

  it("should return array of events with location, sport and user as filters", async () => {

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

  it("should update all events with certain location to new location name", async () => {

    const locationId = "Nordis1234";
    const newName = "Nordenskoldinkatu";

    await supertest(app).put(`/events?location=${locationId}`)
      .send({ locationName: newName })
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/events?location=${locationId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return result.body.forEach((event: any) => {
      expect(event.locationName).toBe(newName)
    });

  });
  
  it("should update all events with certain sport to new sport name", async () => {

    const sportId = "1";
    const newName = "Salibandy";

    await supertest(app).put(`/events?sport=${sportId}`)
      .send({ sportName: newName })
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/events?sport=${sportId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return result.body.forEach((event: any) => {
      expect(event.sportName).toBe(newName)
    });

  });

  it("should update all events with certain creator to new created by name", async () => {

    const createdById = "bbe42984-051b-4a01-b45d-b8d29c32200c";
    const newName = "jouhou";

    await supertest(app).put(`/events?user=${createdById}`)
      .send({ createdByName: newName })
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/events?user=${createdById}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return result.body.forEach((event: any) => {
      expect(event.createdByName).toBe(newName)
    });

  });

});


describe("event", () => {

  it("should return a 404", async () => {
    const eventId = "event-123";

    await supertest(app).get(`/events/${eventId}`).expect(404);
  });

  it("should return one event", async () => {
    const eventId = "juhoniinikoski.Pihapelit";

    const result = await supertest(app).get(`/events/${eventId}`)
      .expect(200)
      .expect('Content-Type', /json/);

    return expect(result.body.name).toBe("Pihapelit");
  });

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
    
  it("should update one event succesfully", async () => {

    const eventId = "juhoniinikoski.Pihapelit2";
    
    const event: Partial<EventClass> = {
      name: "juhon testievent",
      description: "testi112@gmail.com"
    };

    return await supertest(app).put(`/events/${eventId}`)
      .send(event)
      .set('Accept', 'application/json')
      .expect(201);
  });
  
  it("should delete one event succesfully", async () => {

    const eventId = "juhoniinikoski.Pihapelit2";

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