import supertest from "supertest";
import app from "../app";
import LocationClass from "../models/Location";

describe("locations", () => {

  it("should return array of locations", async () => {
    const result = await supertest(app).get("/locations")
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.length).toBeDefined();

  });
  
  it("should return array of locations filtered with sport", async () => {

    const sportId = '1';

    const result = await supertest(app).get(`/locations?sport=${sportId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(result.body.length).toBeDefined();  
    return result.body.forEach((location: any) => {
      location.sports.forEach((sport: any) => {
        expect(sport.sportId).toBe(sportId)
      });
    });

  });

});

describe("location", () => {

  it("should return a location with correct id", async () => {

    const locationId = "Nordis1234";

    const result = await supertest(app).get(`/locations/${locationId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.name).toBe("Nordis");
  });
  
  it("shouldn't return a location with incorrect id", async () => {

    const locationId = "Nordis123456";

    return await supertest(app).get(`/locations/${locationId}`)
      .expect(404);
  });

  it("should create a new location named testilokaatio", async () => {

    const event: Partial<LocationClass> = {
      name: "testilokaatio",
      description: "testilokaation descriptioni",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/locations');

    await supertest(app).post('/locations')
      .send(event)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get('/locations');
    
    return expect(result.body.length).toBe(initial.body.length + 1);
  });

  it("shouldn't create a new location if name is already taken", async () => {

    const event: Partial<LocationClass> = {
      name: "Nordis",
      description: "testilokaation descriptioni",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/locations');

    await supertest(app).post('/locations')
      .send(event)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/locations');
    
    return expect(result.body.length).toBe(initial.body.length);
  });

  it("should delete a location", async () => {

    const locationId = "Myllypuro1234";

    const initial = await supertest(app).get('/locations');

    await supertest(app).delete(`/locations/${locationId}`)
      .set('Accept', 'application/json')
      .expect(204);

    const result = await supertest(app).get('/locations');
    return expect(result.body.length).toBe(initial.body.length - 1);

  });

  it("shouldn't delete a location as id doesn't exist", async () => {

    const locationId = "Ogeli123456789";

    const initial = await supertest(app).get('/locations');

    await supertest(app).delete(`/locations/${locationId}`)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/locations');
    return expect(result.body.length).toBe(initial.body.length);

  });

  it("should update name of location", async () => {

    const locationId = "Ogeli1234";
    const location = {
      name: "Ogelin urheilupuisto"
    };

    await supertest(app).put(`/locations/${locationId}`)
      .send(location)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/locations/${locationId}`);

    expect(result.body.id).toBe(locationId);
    return expect(result.body.name).toBe(location.name);

  });

  it("shouldn't update name of location if it's used", async () => {

    const locationId = "Ogeli1234";
    const location = {
      name: "Nordis"
    };

    await supertest(app).put(`/locations/${locationId}`)
      .send(location)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get(`/locations/${locationId}`);

    expect(result.body.id).toBe(locationId);
    return expect(result.body.name).toBe("Ogelin urheilupuisto");

  });

});

describe("location attributes", () => {

  it("should add a sport to location", async () => {

    const locationId = "Ogeli1234";
    const sportId = "6";
    const initial = await supertest(app).get(`/locations/${locationId}`);

    await supertest(app).post(`/locations/${locationId}/sports`)
      .send({ sportId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/locations/${locationId}`);
    return expect(result.body.sports.length).toBe(initial.body.sports.length + 1);

  });
  
  it("should remove a sport from location", async () => {

    const locationId = "Ogeli1234";
    const sportId = "6";
    const initial = await supertest(app).get(`/locations/${locationId}`);

    await supertest(app).post(`/locations/${locationId}/sports`)
      .send({ sportId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/locations/${locationId}`);
    return expect(result.body.sports.length).toBe(initial.body.sports.length - 1);

  });

});