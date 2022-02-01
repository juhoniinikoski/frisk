import supertest from "supertest";
import app from "../app";
import SportClass from "../models/Sport";

describe("sports", () => {

  it("should return array of sports", async () => {
    const result = await supertest(app).get("/sports")
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.length).toBeDefined();

  });
  
  it("should return array of sports filtered with location", async () => {

    const locationId = "Nordis1234"

    const result = await supertest(app).get(`/sports?location=${locationId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(result.body.length).toBeDefined();
    return result.body.forEach((sport: any) => {
      sport.locations.forEach((location: any) => {
        expect(location.locationId).toBe(locationId)
      });
    });

  });

});

describe("sport", () => {

  it("should return a sport with correct id", async () => {

    const sportId = "2";

    const result = await supertest(app).get(`/sports/${sportId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.name).toBe("Lätkä");
  });
  
  it("shouldn't return a sport with incorrect id", async () => {

    const sportId = "23";

    return await supertest(app).get(`/sports/${sportId}`)
      .expect(404);
  });

  it("should create a new sport named testiurheilu", async () => {

    const sport: Partial<SportClass> = {
      name: "testiurheilu",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/sports');

    await supertest(app).post('/sports')
      .send(sport)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get('/sports');
    
    return expect(result.body.length).toBe(initial.body.length + 1);
  });

  it("shouldn't create a new sport if name is already taken", async () => {

    const sport: Partial<SportClass> = {
      name: "Koris",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/sports');

    await supertest(app).post('/sports')
      .send(sport)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/sports');
    
    return expect(result.body.length).toBe(initial.body.length);
  });

  it("should delete a sport", async () => {

    const sportId = "4";

    const initial = await supertest(app).get('/sports');

    await supertest(app).delete(`/sports/${sportId}`)
      .set('Accept', 'application/json')
      .expect(204);

    const result = await supertest(app).get('/sports');
    return expect(result.body.length).toBe(initial.body.length - 1);

  });

  it("shouldn't delete a sport when id doesn't exist", async () => {

    const sportId = "9";

    const initial = await supertest(app).get('/sports');

    await supertest(app).delete(`/sports/${sportId}`)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/sports');
    return expect(result.body.length).toBe(initial.body.length);

  });

  it("should update name of sport", async () => {

    const sportId = "1";
    const sport = {
      name: "Salibandy"
    };

    await supertest(app).put(`/sports/${sportId}`)
      .send(sport)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/sports/${sportId}`);

    expect(result.body.id).toBe(sportId);
    return expect(result.body.name).toBe(sport.name);

  });

  it("shouldn't update name of sport if it's used", async () => {

    const sportId = "3";
    const sport = {
      name: "Lätkä"
    };

    await supertest(app).put(`/sports/${sportId}`)
      .send(sport)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get(`/sports/${sportId}`);

    expect(result.body.id).toBe(sportId);
    return expect(result.body.name).toBe("Futis");

  });

});

describe("sport attributes", () => {

  it("should add a location to sport", async () => {

    const locationId = "Ogeli1234";
    const sportId = "1";
    const initial = await supertest(app).get(`/sports/${sportId}/test`);

    await supertest(app).post(`/sports/${sportId}/locations`)
      .send({ locationId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/sports/${sportId}/test`);
    return expect(result.body.locations.length).toBe(initial.body.locations.length + 1);

  });
  
  it("should remove a location from sport", async () => {

    const locationId = "Ogeli1234";
    const sportId = "1";
    const initial = await supertest(app).get(`/sports/${sportId}/test`);

    await supertest(app).post(`/sports/${sportId}/locations`)
      .send({ locationId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/sports/${sportId}/test`);
    return expect(result.body.locations.length).toBe(initial.body.locations.length - 1);

  });

  it("should add a user to sport", async () => {

    const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
    const sportId = "2";
    const initial = await supertest(app).get(`/sports/${sportId}/test`);

    await supertest(app).post(`/sports/${sportId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/sports/${sportId}/test`);
    return expect(result.body.users.length).toBe(initial.body.users.length + 1);

  });

  it("should remove a user from sport", async () => {

    const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
    const sportId = "1";
    const initial = await supertest(app).get(`/sports/${sportId}/test`);

    await supertest(app).post(`/sports/${sportId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/sports/${sportId}/test`);
    return expect(result.body.users.length).toBe(initial.body.users.length - 1);

  });

});