import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const eventsQuery = {
  query: `
    query {
      events {
        name
        id
        location {
          name
        }
        activity {
          name
        }
        createdBy {
          username
        }
        start
        end
      }
    }
  `
};

const eventsQueryByLocation = {
  query: `
    query {
      events (location: "Nordis1234") {
        name
        id
        location {
          name
        }
      }
    }
  `
};

const eventsQueryByLocation2 = {
  query: `
    query {
      events (location: "Nordis1234567") {
        name
        id
        location {
          name
        }
      }
    }
  `
};

const eventsQueryByCreator = {
  query: `
    query {
      events (user: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        name
        id
        createdBy {
          username
        }
      }
    }
  `
};

const eventsQueryByCreator2 = {
  query: `
    query {
      events (user: "bbe4298456") {
        name
        id
      }
    }
  `
};

const eventsQueryBySaver = {
  query: `
    query {
      events (savedBy: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2") {
        name
        id
        createdBy {
          username
        }
      }
    }
  `
};

const eventsQueryBySaver2 = {
  query: `
    query {
      events (savedBy: "bbe4298456") {
        name
        id
      }
    }
  `
};

const eventsQueryByActivity = {
  query: `
    query {
      events (activity: "3") {
        name
        id
        activity {
          name
        }
      }
    }
  `
};

const eventsQueryByActivity2 = {
  query: `
    query {
      events (activity: "3456") {
        name
        id
        activity {
          name
        }
      }
    }
  `
};

const eventQuery = {
  query: `
    query {
      event (id: "juhoniinikoski.Pihapelit") {
        name
        id
        location {
          name
        }
        activity {
          name
        }
        createdBy {
          username
        }
        start
        end
      }
    }
  `
};

const invalidQuery = {
  query: `
    query {
      event (id: "juhoniinikoski.Pihapelit1234554") {
        name
        id
      }
    }
  `
};

describe("get events", () => {

  it("returns list of events", async () => {
    const result = await testServer.executeOperation({query: eventsQuery.query});
    expect(result).toBeDefined();
    return expect(result.data.events).toBeInstanceOf(Array);
  });

  it("returns an event by valid id", async () => {
    const result = await testServer.executeOperation({query: eventQuery.query});
    return expect(result.data.event.name).toBe("Pihapelit");
  });
  
  it("throws an error when id is invalid", async () => {
    const result = await testServer.executeOperation({query: invalidQuery.query});
    return expect(result.errors[0].message).toBeDefined();
  });

  it("should get events with specific location", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByLocation.query});
    result.data.events.forEach((event: any) => {
      expect(event.location.name).toBe("Nordis");
    });
    return expect(result.data.events).toBeInstanceOf(Array);
  });

  it("should return with empty array if events with given location doesn't exist", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByLocation2.query});
    return expect(result.data.events).toEqual([]);
  });
  
  it("should get events with specific activity", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByActivity.query});
    result.data.events.forEach((event: any) => {
      expect(event.activity.name).toBe("Futis");
    });
    return expect(result.data.events).toBeInstanceOf(Array);
  });

  it("should return with empty array if events with given activity doesn't exist", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByActivity2.query});
    return expect(result.data.events).toEqual([]);
  });

  it("should get events with specific creator", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByCreator.query});
    result.data.events.forEach((event: any) => {
      expect(event.createdBy.username).toBe("juhoniinikoski");
    });
    return expect(result.data.events).toBeInstanceOf(Array);
  });

  it("should return with empty array if events with given creator doesn't exist", async () => {
    const result = await testServer.executeOperation({query: eventsQueryByCreator2.query});
    return expect(result.data.events).toEqual([]);
  });
  
  it("should get events saved by specific user", async () => {
    const result = await testServer.executeOperation({query: eventsQueryBySaver.query});
    result.data.events.forEach((event: any) => {
      expect(event.createdBy.username).toBe("juhoniinikoski");
    });
    return expect(result.data.events).toBeInstanceOf(Array);
  });

  it("should return with empty array if events saved by given user doesn't exist", async () => {
    const result = await testServer.executeOperation({query: eventsQueryBySaver2.query});
    return expect(result.data.events).toEqual([]);
  });

});