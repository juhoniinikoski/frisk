import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const sportsQuery = {
  query: `
    query {
      sports {
        name
        id
      }
    }
  `
};

const sportsByLocation = {
  query: `
    query {
      sports (location: "Nordis1234") {
        name
        id
      }
    }
  `
};

const sportsBySaver = {
  query: `
    query {
      sports (savedBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        name
        id
      }
    }
  `
};

const sportQuery = {
  query: `
    query {
      sport (id: "3") {
        name
        id
        locations {
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
      sport (id: "500") {
        name
        id
      }
    }
  `
};

describe("get sports", () => {

  it("should get an array of sports", async () => {
    const result = await testServer.executeOperation({query: sportsQuery.query});
    expect(result).toBeDefined();
    return expect(result.data.sports).toBeInstanceOf(Array);
  });

  it("should get a sport with valid id", async () => {
    const result = await testServer.executeOperation({query: sportQuery.query});
    return expect(result.data.sport.name).toBe("Futis");
  });

  it("should throw an error when getting sport with invalid id", async () => {
    const result = await testServer.executeOperation({query: invalidQuery.query});
    return expect(result.errors[0].message).toBeDefined();
  });

  it("should get sports by specific location", async () => {
    const result = await testServer.executeOperation({query: sportsByLocation.query});
    expect(result).toBeDefined();
    return expect(result.data.sports).toBeInstanceOf(Array);
  });

  it("should get locations saved by specific user", async () => {
    const result = await testServer.executeOperation({query: sportsBySaver.query});
    expect(result).toBeDefined();
    return expect(result.data.sports).toBeInstanceOf(Array);
  });

});
