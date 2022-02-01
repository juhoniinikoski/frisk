import testServer from '../config/testServer';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const sportsQuery = {
  query: `
      query {
        sports{
          name
          id
        }
      }
    `
};

const sportQuery = {
  query: `
      query {
        sport(id: "4") {
          name
          locations {
            name
          }
          events {
            eventTitle
            createdBy {
              username
            }
            location {
              name
            }
          }
        }
      }
    `
};

const createSportMutation = {
  mutation: `
    mutation {
      createSport(
        sport: {
          name: "käsipallo"
          locations: ["Nordis1234"]
        }
      )
    }
  `
}

const createEventMutation = {
  mutation: `
    mutation {
      createEvent(
        event: {
          eventTitle: "testinTekemäEvent2",
          description: "description",
          locationId: "Oulunkylän urheilupuisto1234",
          sportId: "4",
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
      deleteEvent(id: "juhoniinikoski.Ulkokoris")
    }
  `
};

// couldn't test creation as SQlite3 doesnät support batch insert related to sportIds within location


describe("add sport", () => {

  const { query } = sportsQuery;
  const { mutation: deleteMutation } = createSportMutation;

  test('add', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: deleteMutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.sports.length).toBe(initial.data.sports.length + 1);
  });

});

describe("events of certain sport", () => {

  const { query } = sportQuery;

  test('events of sport', async () => {
    const result = await testServer.executeOperation({query: query});
    expect(result.data.sport.events[0].eventTitle).toBeDefined();
    expect(result.data.sport.events[0].location.name).toBeDefined();
    return expect(result.data.sport.events[0].createdBy.username).toBeDefined();
  })

})

describe("locations of certain sport", () => {

  const { query } = sportQuery;

  test('locations of sport', async () => {
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.sport.locations[0].name).toBeDefined();
  })

})

describe("new event of certain sport", () => {

  const { query } = sportQuery;
  const { mutation } = createEventMutation;
  const { mutation: deleteMutation } = deleteEventMutation;

  test('new event', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.sport.events.length).toBe(initial.data.sport.events.length + 1);
  })
  
  test('delete event', async () => {
    const initial = await testServer.executeOperation({query: query});
    await testServer.executeOperation({query: deleteMutation});
    const result = await testServer.executeOperation({query: query});
    return expect(result.data.sport.events.length).toBe(initial.data.sport.events.length - 1);
  })
  

})

// describe("locations of certain sport", () => {

//   const { query } = sportQuery;

//   test('locations of sport', async () => {
//     const result = await testServer.executeOperation({query: query});
//     return expect(result.data.sport.locations[0].name).toBeDefined();
//   })

// })


// urheilulajien taphtumissa näkyy myös äskettäin lisätty tapahtuma
// urheilulajin lokaatioissa näkyy tapahtuma, joka on lisätty paikkaan, joka ei aikasemmin ollut kyseisen lajin tapahtumapaikka