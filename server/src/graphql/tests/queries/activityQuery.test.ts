
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

import testServer from "../../../utils/testServer";

const activitiesQuery = {
  query: `
    query {
      activities {
        name
        id
      }
    }
  `
};

const activitiesByLocation = {
  query: `
    query {
      activities (locationId: "Nordis1234") {
        name
        id
      }
    }
  `
};

const activitiesBySaver = {
  query: `
    query {
      activities (savedBy: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        name
        id
      }
    }
  `
};

const activityQuery = {
  query: `
    query {
      activity (id: "3") {
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
      activity (id: "500") {
        name
        id
      }
    }
  `
};

describe("get activities", () => {

  it("should get an array of activities", async () => {
    const result = await testServer.executeOperation({query: activitiesQuery.query});
    expect(result).toBeDefined();
    return expect(result.data.activities).toBeInstanceOf(Array);
  });

  it("should get a activity with valid id", async () => {
    const result = await testServer.executeOperation({query: activityQuery.query});
    return expect(result.data.activity.name).toBe("Futis");
  });

  it("should throw an error when getting activity with invalid id", async () => {
    const result = await testServer.executeOperation({query: invalidQuery.query});
    return expect(result.errors[0].message).toBeDefined();
  });

  it("should get activities by specific location", async () => {
    const result = await testServer.executeOperation({query: activitiesByLocation.query});
    expect(result).toBeDefined();
    return expect(result.data.activities).toBeInstanceOf(Array);
  });

  it("should get locations saved by specific user", async () => {
    const result = await testServer.executeOperation({query: activitiesBySaver.query});
    expect(result).toBeDefined();
    return expect(result.data.activities).toBeInstanceOf(Array);
  });

});