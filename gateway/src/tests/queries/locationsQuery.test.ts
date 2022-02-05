import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const locationsQuery = {
  query: `
    query {
      locations {
        name
        id
      }
    }
  `
};

const locationsBySport = {
  query: `
    query {
      locations (sport: "3") {
        name
        id
      }
    }
  `
};

const locationsBySaver = {
  query: `
    query {
      locations (savedBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        name
        id
      }
    }
  `
};

const locationQuery = {
  query: `
    query {
      location (id: "Nordis1234") {
        name
        id
        sports {
          name
        }
        events {
          name
        }
      }
    }
  `
};

const invalidQuery = {
  query: `
    query {
      location (id: "Nordis123456789") {
        name
        id
      }
    }
  `
};

describe("get locations", () => {

  it("should get array of locations", async () => {
    const result = await testServer.executeOperation({query: locationsQuery.query});
    expect(result).toBeDefined();
    return expect(result.data.locations).toBeInstanceOf(Array);
  });

  it("should get a location with given id", async () => {
    const result = await testServer.executeOperation({query: locationQuery.query});
    return expect(result.data.location.name).toBe("Nordis");
  });

  it("should throw error when trying to get location with incorrect id", async () => {
    const result = await testServer.executeOperation({query: invalidQuery.query});
    return expect(result.errors[0].message).toBeDefined();
  });

  it("should get locations by given sport", async () => {
    const result = await testServer.executeOperation({query: locationsBySport.query});
    expect(result).toBeDefined();
    return expect(result.data.locations).toBeInstanceOf(Array);
  });

  it("should get locations saved by given user", async () => {
    const result = await testServer.executeOperation({query: locationsBySaver.query});
    expect(result).toBeDefined();
    return expect(result.data.locations).toBeInstanceOf(Array);
  });

});