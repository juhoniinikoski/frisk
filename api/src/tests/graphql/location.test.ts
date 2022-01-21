import testServer from '../config/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const locationsQuery = {
  query: `
      query {
        locations{
          name
          id
          sports {
            name
          }
        }
      }
    `
};

const locationQuery = {
  query: `
      query {
        location(id: "Oulunkylän urheilupuisto1234") {
          name
          id
          sports {
            name
          }
          events {
            eventTitle
            createdBy {
              username
            }
            sport {
              name
            }
          }
        }
      }
    `
};

const deleteLocationMutation = {
  mutation: `
    mutation {
      deleteLocation(id: "Nordis1234")
    }
  `
};

const addSportMutation = {
  mutation: `
    mutation {
      addSport(add: {
        locationId: "Oulunkylän urheilupuisto1234", sportId: "3"
      })
    }
  `
};

const createEventMutation = {
  mutation: `
    mutation {
      createEvent(
        event: {
          eventTitle: "testinTekemäEvent2",
          description: "description",
          locationId: "Oulunkylän urheilupuisto1234",
          sportId: 3,
          start: 1642874400,
          end: 1642881600
        }
      )
    }
  `
};

// couldn't test creation as SQlite3 doesnät support batch insert related to sportIds within location


describe("delete location", () => {

  const { query } = locationsQuery;
  const { mutation: deleteMutation } = deleteLocationMutation;

  test('delete 1', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: deleteMutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.locations.length).toBe(initial.data.locations.length - 1);
  });

});

describe("adding sport to location", () => {

  const { query } = locationQuery;
  const { mutation } = addSportMutation;

  test("no. of sport is increased by one", async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.location.sports.length).toBe(initial.data.location.sports.length + 1)
  });
});

describe("deleting sport from location", () => {

  const { query } = locationQuery;
  const { mutation } = addSportMutation;

  test("no. of sport is decreased by one", async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.location.sports.length).toBe(initial.data.location.sports.length - 1)
  });
});

describe("add event to location", () => {

  const { query } = locationQuery;
  const { mutation } = createEventMutation

  test("no. of events is increased by 1", async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.location.events.length).toBe(initial.data.location.events.length + 1);
  });
});

describe("location events: createdBy and sport name", () => {
  const { query } = locationQuery;

  test("createdBy username is not null", async () => {
    const result = await testServer.executeOperation({query: query});
    const location = result.data.location;
    return expect(location.events[0].createdBy.username).toBeDefined();
  });
  
  test("sport name is not null", async () => {
    const result = await testServer.executeOperation({query: query});
    const location = result.data.location;
    return expect(location.events[0].sport.name).toBeDefined();
  });

});
