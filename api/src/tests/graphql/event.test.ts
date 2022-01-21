import testServer from '../config/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const eventsQuery = {
  query: `
      query {
        events{
          eventTitle
          id
          location {
            name
          }
          sport {
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

const createEventMutation = {
  mutation: `
    mutation {
      createEvent(
        event: {
          eventTitle: "testinTekemäEvent",
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

const deleteEventMutation = {
  mutation: `
    mutation {
      deleteEvent(id: "juhoniinikoski.Pihapelit")
    }
  `
};


describe("create/delete event", () => {

  const { query } = eventsQuery;
  const { mutation } = createEventMutation;
  const { mutation: deleteMutation } = deleteEventMutation;

  test('create 1', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.events.length).toBe(initial.data.events.length + 1);
  });

  test('delete 1', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: deleteMutation});
    const result = await testServer.executeOperation({query: query});
    expect(result.data.events[0].eventTitle).not.toBe("Pihapelit");
    return expect(result.data.events.length).toBe(initial.data.events.length - 1);
  });

});

describe("event location name", () => {
  const { query } = eventsQuery;

  test("location name is not null", async () => {
    const result = await testServer.executeOperation({query: query});
    const events = result.data.events;
    return expect(events[0].location.name).toBeDefined();
  });
});

describe("event sport name", () => {
  const { query } = eventsQuery;

  test("sport name is not null", async () => {
    const result = await testServer.executeOperation({query: query});
    const events = result.data.events;
    return expect(events[0].sport.name).toBeDefined();
  });
});

describe("event createdBy username", () => {
  const { query } = eventsQuery;

  test("createdBy username is not null", async () => {
    const result = await testServer.executeOperation({query: query});
    const events = result.data.events;
    return expect(events[0].createdBy.username).toBeDefined();
  });
});

// updates