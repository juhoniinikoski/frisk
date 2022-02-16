import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */

const invalidLocation = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "Testi",
        description: "koriksen descriptioni",
        locationId: "Nordis1234567",
        activityId: "4",
        start: "2022-02-07T17:45:53.719Z",
        end: "2022-02-07T19:45:53.719Z",
        free: true,
        price: 0,
        repetition: SINGLE
      })
    }
  `
};

const invalidActivity = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "Testi",
        description: "koriksen descriptioni",
        locationId: "Nordis1234",
        activityId: "45678",
        start: "2022-02-07T17:45:53.719Z",
        end: "2022-02-07T19:45:53.719Z",
        free: true,
        price: 0,
        repetition: SINGLE
      })
    }
  `
};

const invalidInput = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "",
        description: "koriksen descriptioni",
        locationId: "Nordis1234",
        activityId: "4",
        start: "2022-02-07T17:45:53.719Z",
        end: "2022-02-07T19:45:53.719Z",
        free: true,
        price: 0,
        repetition: SINGLE
      })
    }
  `
};

describe("create event", () => {

  it.todo("should create an event succesfully");

  it.todo("should add a new location to activity with id 4");

  it.todo("should not add or remove loctation from activity with id 4");

  it("should throw an error if event is created with undefined location", async () => {

    const result = await testServer.executeOperation({query: invalidLocation.mutation});
    return expect(result.errors[0].message).toBe("Location with given id doesn't exist.");

  });

  it("should throw an error if event is created with undefined activity", async () => {

    const result = await testServer.executeOperation({query: invalidActivity.mutation});
    return expect(result.errors[0].message).toBe("Activity with given id doesn't exist.");

  });

  it("shouldn't create an event if data is defective", async () => {

    const result = await testServer.executeOperation({query: invalidInput.mutation});
    return expect(result.errors[0].message).toBe("name is a required field");

  });

});

describe("delete event", () => {

  it.todo("should delete an event succesfully");

  it.todo("should throw an error if user is not permitted to delete the event");

});