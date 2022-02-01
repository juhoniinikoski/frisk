import testServer from '../config/testServer';
import { User } from '../../entities';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const userQueryTest = {
    id: 'user',
    query: `
      query {
        user(id: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
          username
          email
          savedEvents {
            eventTitle
            location {
              name
            }
          }
          savedLocations {
            name
            id
          }
          savedSports {
            name
            id
          }
          followedUsers {
            username
            id
          }
        }
      }
    `
};

const followUserMutation = {
  id: 'followUser',
  mutation: `
    mutation {
      followUser(followedId: "753f3e99-e73a-43a3-9a50-b30d7727c0eb")
    }
  `
};

const createUserMutation = {
  id: 'createUser',
  mutation: `
    mutation {
      createUser(user: {username: "testikäyttäjä", password: "password", email: "testi@gmail.com"}) {
        username
        email
      }
    }
  `
};

const saveEventMutation = {
  id: 'saveEvent',
  mutation: `
    mutation {
      saveEvent(eventId: "johndoe.Testievent")
    }
  `
};

const saveSportMutation = {
  id: 'saveSport',
  mutation: `
    mutation {
      saveSport(sportId: "4")
    }
  `
};

const saveLocationMutation = {
  id: 'saveLocation',
  mutation: `
    mutation {
      saveLocation(locationId: "Töölönlahti1234")
    }
  `
};

const changeUsernameMutation = {
  id: 'changeusername',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "juhoniinikoski2",
        email: "testi1@gmail.com"
      }
    )
  }
`
};

const changeUsernameMutation3 = {
  id: 'changeemail',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "johndoe",
        email: "testi9@gmail.com"
      }
    )
  }
`
};

const changeEmailMutation = {
  id: 'changeusername',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "juhoniinikoski2"
        email: "testi9@gmail.com"
      }
    )
  }
`
};

const changeEmailMutation3 = {
  id: 'changeusername',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "juhoniinikoski2"
        email: "testi3@gmail.com"
      }
    )
  }
`
};

const changeEmailMutation2 = {
  id: 'changeusername',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "juhoniinikoski"
        email: "testi1@gmail.com"
      }
    )
  }
`
};

const changeUsernameMutation2 = {
  id: 'changeusername',
  mutation: `
  mutation {
    updateUser(
      user: {
        id: "bbe42984-051b-4a01-b45d-b8d29c32200c",
        username: "juhoniinikoski",
        email: "testi9@gmail.com"
      }
    )
  }
`
};


describe('user creation and deleting', () => {

  const { mutation } = createUserMutation;

  test('new user', async () => {
    const mutate = await testServer.executeOperation({query: mutation});
    expect(mutate.data.createUser.email).toEqual("testi@gmail.com");
    return expect(mutate.data.createUser.username).toEqual("testikäyttäjä");
  });

  test('already taken username', async () => {
    const mutate = await testServer.executeOperation({query: mutation});
    return expect(mutate.errors[0].message).toContain("Username testikäyttäjä is already taken. Choose another username");
  });

});

describe('follow/unfollow antoher user', () => {

  const { query } = userQueryTest;
  const { mutation } = followUserMutation;

  let initialUser: Partial<User> = null;

  test('follow', async () => {
    const initial = await testServer.executeOperation({query: query});
    initialUser = initial.data.user;
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    return expect(user.followedUsers.length).toBe(initialUser.followedUsers.length + 1);
  });

  test('unfollow', async () => {
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user = result.data.user;
    return expect(user.followedUsers.length).toBe(initialUser.followedUsers.length);
  });

});


describe('save event', () => {

  const { mutation } = saveEventMutation;
  const { query } = userQueryTest;

  let initialUser: Partial<User> = null;

  test('save', async () => {
    const initial = await testServer.executeOperation({query: query});
    initialUser = initial.data.user;
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(user.savedEvents[0].eventTitle).toBe("Testievent");
    expect(user.savedEvents[0].location.name).toBe("Töölönlahti");
    return expect(user.savedEvents.length).toBe(initialUser.savedEvents.length + 1);
  });

  test('unsave', async () => {
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user = result.data.user;
    return expect(user.savedEvents.length).toBe(initialUser.savedEvents.length);
  });

});


describe('save sport', () => {

  const { mutation } = saveSportMutation;
  const { query } = userQueryTest;

  let initialUser: Partial<User> = null;

  test('save', async () => {
    const initial = await testServer.executeOperation({query: query});
    initialUser = initial.data.user;
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    return expect(user.savedSports.length).toBe(initialUser.savedSports.length + 1);
  });

  test('unsave', async () => {
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user = result.data.user;
    return expect(user.savedSports.length).toBe(initialUser.savedSports.length);
  });

});


describe('save location', () => {

  const { mutation } = saveLocationMutation;
  const { query } = userQueryTest;

  let initialUser: Partial<User> = null;

  test('save', async () => {
    const initial = await testServer.executeOperation({query: query});
    initialUser = initial.data.user;
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(user.savedLocations[0].name).toBe("Töölönlahti");
    return expect(user.savedLocations.length).toBe(initialUser.savedLocations.length + 1);
  });

  test('unsave', async () => {
    await testServer.executeOperation({query: mutation});
    const result = await testServer.executeOperation({query: query});
    const user = result.data.user;
    return expect(user.savedLocations.length).toBe(initialUser.savedLocations.length);
  });

});

describe('update personal information', () => {

  const { mutation: usernameMutation } = changeUsernameMutation;
  const { mutation: usernameMutation2 } = changeUsernameMutation2;
  const { mutation: usernameMutation3 } = changeUsernameMutation3;
  const { mutation: emailMutation } = changeEmailMutation;
  const { mutation: emailMutation2 } = changeEmailMutation2;
  const { mutation: emailMutation3 } = changeEmailMutation3;

  const { query } = userQueryTest;

  test('change username', async () => {
    await testServer.executeOperation({query: usernameMutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(user.username).toEqual("juhoniinikoski2");
    return expect(user.email).toEqual("testi1@gmail.com");
  });

  test('change email', async () => {
    await testServer.executeOperation({query: emailMutation});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(user.username).toEqual("juhoniinikoski2");
    return expect(user.email).toEqual("testi9@gmail.com");
  });

  test('change username to existing one', async () => {
    const mutate = await testServer.executeOperation({query: usernameMutation3});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(mutate.errors[0].message).toContain("Username johndoe is already taken. Choose another username");
    return expect(user.username).toEqual("juhoniinikoski2");
  });

  test('change email to existing one', async () => {
    const mutate = await testServer.executeOperation({query: emailMutation3});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(mutate.errors[0].message).toContain("Email testi3@gmail.com is already taken.");
    return expect(user.email).toEqual("testi9@gmail.com");
  });
  
  test('change username to old one', async () => {
    await testServer.executeOperation({query: usernameMutation2});
    const result = await testServer.executeOperation({query: query});
    const user = result.data.user;
    expect(user.username).toEqual("juhoniinikoski");
    return expect(user.email).toEqual("testi9@gmail.com");
  });

  test('change email to old one', async () => {
    await testServer.executeOperation({query: emailMutation2});
    const result = await testServer.executeOperation({query: query});
    const user: Partial<User> = result.data.user;
    expect(user.username).toEqual("juhoniinikoski");
    return expect(user.email).toEqual("testi1@gmail.com");
  });
  

});

afterAll(done => {
  done();
});