import testServer from "../../../utils/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const usersQuery = {
  query: `
    query {
      users {
        id
        username
        email
      }
    }
  `,
};

const userQueryID = {
  query: `
    query {
      user(id: "cff8872a-8ff5-4092-ac2f-d79e65f18aa2") {
        id
        username
        email
      }
    }
  `,
};

const userQueryUsername = {
  query: `
    query {
      user(id: "johndoe") {
        id
        username
        email
      }
    }
  `,
};

const userQueryInvalidID = {
  query: `
    query {
      user(id: "bbe42984-051b-4a01-b45d-b8d29c322") {
        id
        username
        email
      }
    }
  `,
};

const userQueryInvalidUsername = {
  query: `
    query {
      user(id: "joku jota ei ole olemassa") {
        id
        username
        email
      }
    }
  `,
};

describe('testing user read', () => {
  test('should get list of users', async () => {
    const result = await testServer.executeOperation({ query: usersQuery.query });
    expect(result).toBeDefined();
    return expect(result.data.users).toBeInstanceOf(Array);
  });

  test('should return one user with correct id', async () => {
    const result = await testServer.executeOperation({ query: userQueryID.query });
    return expect(result.data.user.username).toBe('mattimeikalainen');
  });

  test('should throw an error if use with given id is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidID.query });
    return expect(result.errors[0].message).toBeDefined();
  });

  test('should return one user with correct username', async () => {
    const result = await testServer.executeOperation({ query: userQueryUsername.query });
    return expect(result.data.user.username).toBe('johndoe');
  });

  test('should throw an error if user with given username is not found', async () => {
    const result = await testServer.executeOperation({ query: userQueryInvalidUsername.query });
    return expect(result.errors[0].message).toBeDefined();
  });
});
