import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const invalidLocation = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "Testi",
        description: "koriksen descriptioni",
        locationId: "Nordis1234567",
        sportId: "4",
        start: "2022-02-07T17:45:53.719Z",
        end: "2022-02-07T19:45:53.719Z",
        free: true,
        price: 0,
        repetition: SINGLE
      })
    }
  `
};

const invalidSport = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "Testi",
        description: "koriksen descriptioni",
        locationId: "Nordis1234",
        sportId: "45678",
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
        sportId: "4",
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

  // it.todo("should create an event succesfully");

  it.todo("should add a new location to sport with id 4");

  it.todo("should not add or remove loctation from sport with id 4");

  it("should throw an error if event is created with undefined location", async () => {

    const result = await testServer.executeOperation({query: invalidLocation.mutation});
    console.log(result);
    return expect(result.errors[0].message).toBe("Location with given id doesn't exist.");

  });

  it("should throw an error if event is created with undefined sport", async () => {

    const result = await testServer.executeOperation({query: invalidSport.mutation});
    return expect(result.errors[0].message).toBe("Sport with given id doesn't exist.");

  });

  it("shouldn't create an event if data is defective", async () => {

    const result = await testServer.executeOperation({query: invalidInput.mutation});
    return expect(result.errors[0].message).toBe("name is a required field");

  });

});