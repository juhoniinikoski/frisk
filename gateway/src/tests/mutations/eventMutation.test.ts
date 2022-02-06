import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const date = Number((Date.now() / 1000).toFixed(0))

const invalidLocation = {
  mutation: `
    mutation {
      createEvent (event: {
        name: "Testi",
        description: "koriksen descriptioni",
        locationId: "Nordis1234567",
        sportId: "4",
        start: ${date},
        end: ${date + 7200000},
        free: true,
        price: 0.0,
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
        start: ${date},
        end: ${date + 7200000},
        free: true,
        price: 0.0,
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
        start: ${date},
        end: ${date + 7200000},
        free: true,
        price: 0.0,
        repetition: SINGLE
      })
    }
  `
};

describe("create event", () => {

  const date = Date.now()

  // it.todo("should create an event succesfully");

  it("should throw an error if event is created with undefined location", async () => {

    const result = await testServer.executeOperation({query: invalidLocation.mutation});
    return expect(result.errors[0].message).toBe("Location with given id doesn't exist.")

  });

  it("should throw an error if event is created with undefined sport", async () => {

    const result = await testServer.executeOperation({query: invalidSport.mutation});
    return expect(result.errors[0].message).toBe("Sport with given id doesn't exist.")

  });

  it("shouldn't create an event if data is defective", async () => {

    const result = await testServer.executeOperation({query: invalidInput.mutation});
    return expect(result.errors[0].message).toBe("Input data is missing some required properties.")

  });

});