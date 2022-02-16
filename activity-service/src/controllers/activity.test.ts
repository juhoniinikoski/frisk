import supertest from "supertest";
import app from "../app";
import ActivityClass from "../models/Activity";

describe("activities", () => {

  it("should return array of activities", async () => {
    const result = await supertest(app).get("/activities")
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.length).toBeDefined();

  });
  
  it("should return array of activities filtered with location", async () => {

    const locationId = "Nordis1234"

    const result = await supertest(app).get(`/activities?location=${locationId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    expect(result.body.length).toBeDefined();
    return result.body.forEach((activity: any) => {
      activity.locations.forEach((location: any) => {
        expect(location.locationId).toBe(locationId)
      });
    });

  });

});

describe("activity", () => {

  it("should return a activity with correct id", async () => {

    const activityId = "2";

    const result = await supertest(app).get(`/activities/${activityId}`)
      .expect(200)
      .expect('Content-Type', /json/);
    
    return expect(result.body.name).toBe("Lätkä");
  });
  
  it("shouldn't return a activity with incorrect id", async () => {

    const activityId = "23";

    return await supertest(app).get(`/activities/${activityId}`)
      .expect(404);
  });

  it("should create a new activity named testiurheilu", async () => {

    const activity: Partial<ActivityClass> = {
      name: "testiurheilu",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/activities');

    await supertest(app).post('/activities')
      .send(activity)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get('/activities');
    
    return expect(result.body.length).toBe(initial.body.length + 1);
  });

  it("shouldn't create a new activity if name is already taken", async () => {

    const activity: Partial<ActivityClass> = {
      name: "Koris",
      createdById: "9b9d927e-2ee9-4f93-b96b-c8f677c63a5f"
    };

    const initial = await supertest(app).get('/activities');

    await supertest(app).post('/activities')
      .send(activity)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/activities');
    
    return expect(result.body.length).toBe(initial.body.length);
  });

  it("should delete a activity", async () => {

    const activityId = "4";

    const initial = await supertest(app).get('/activities');

    await supertest(app).delete(`/activities/${activityId}`)
      .set('Accept', 'application/json')
      .expect(204);

    const result = await supertest(app).get('/activities');
    return expect(result.body.length).toBe(initial.body.length - 1);

  });

  it("shouldn't delete a activity when id doesn't exist", async () => {

    const activityId = "9";

    const initial = await supertest(app).get('/activities');

    await supertest(app).delete(`/activities/${activityId}`)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get('/activities');
    return expect(result.body.length).toBe(initial.body.length);

  });

  it("should update name of activity", async () => {

    const activityId = "1";
    const activity = {
      name: "Salibandy"
    };

    await supertest(app).put(`/activities/${activityId}`)
      .send(activity)
      .set('Accept', 'application/json')
      .expect(201);

    const result = await supertest(app).get(`/activities/${activityId}`);

    expect(result.body.id).toBe(activityId);
    return expect(result.body.name).toBe(activity.name);

  });

  it("shouldn't update name of activity if it's used", async () => {

    const activityId = "3";
    const activity = {
      name: "Lätkä"
    };

    await supertest(app).put(`/activities/${activityId}`)
      .send(activity)
      .set('Accept', 'application/json')
      .expect(404);

    const result = await supertest(app).get(`/activities/${activityId}`);

    expect(result.body.id).toBe(activityId);
    return expect(result.body.name).toBe("Futis");

  });

});

describe("activity attributes", () => {

  it("should add a location to activity", async () => {

    const locationId = "Ogeli1234";
    const activityId = "1";
    const initial = await supertest(app).get(`/activities/${activityId}/test`);

    await supertest(app).post(`/activities/${activityId}/locations`)
      .send({ locationId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/activities/${activityId}/test`);
    return expect(result.body.locations.length).toBe(initial.body.locations.length + 1);

  });
  
  it("should remove a location from activity", async () => {

    const locationId = "Ogeli1234";
    const activityId = "1";
    const initial = await supertest(app).get(`/activities/${activityId}/test`);

    await supertest(app).post(`/activities/${activityId}/locations`)
      .send({ locationId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/activities/${activityId}/test`);
    return expect(result.body.locations.length).toBe(initial.body.locations.length - 1);

  });

  it("should add a user to activity", async () => {

    const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
    const activityId = "2";
    const initial = await supertest(app).get(`/activities/${activityId}/test`);

    await supertest(app).post(`/activities/${activityId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/activities/${activityId}/test`);
    return expect(result.body.users.length).toBe(initial.body.users.length + 1);

  });

  it("should remove a user from activity", async () => {

    const userId = "bbe42984-051b-4a01-b45d-b8d29c32200c";
    const activityId = "1";
    const initial = await supertest(app).get(`/activities/${activityId}/test`);

    await supertest(app).post(`/activities/${activityId}/users`)
      .send({ userId })
      .set('Accept', 'application/json')
      .expect(201);
    
    const result = await supertest(app).get(`/activities/${activityId}/test`);
    return expect(result.body.users.length).toBe(initial.body.users.length - 1);

  });

});