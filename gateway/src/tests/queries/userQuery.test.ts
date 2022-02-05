import testServer from "../config/testServer";

/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable @typescript-eslint/no-explicit-any*/

const usersQuery = {
  query: `
    query {
      users {
        username
        id
      }
    }
  `
};

const userQuery = {
  query: `
    query {
      user (id: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
        username
        id
        followedUsers {
          username
        }
        savedSports {
          name
        }
        savedEvents {
          name
        }
        savedLocations {
          name
        }
      }
    }
  `
};

const invalidQuery = {
  query: `
    query {
      user (id: "bbe4298") {
        username
        id
      }
    }
  `
};

describe("get users", () => {

  it("get array of users", async () => {
    const result = await testServer.executeOperation({query: usersQuery.query});
    expect(result).toBeDefined();
    return expect(result.data.users).toBeInstanceOf(Array);
  });

  it("get an user with correct id", async () => {
    const result = await testServer.executeOperation({query: userQuery.query});
    return expect(result.data.user.username).toBe("juhoniinikoski");
  });

  it("should throw an error due to invalid id", async () => {
    const result = await testServer.executeOperation({query: invalidQuery.query});
    return expect(result.errors[0].message).toBeDefined();
  });

  it("should get user's saved events", async () => {
    const result = await testServer.executeOperation({query: userQuery.query});
    return expect(result.data.user.savedEvents).toBeDefined();
  });

  it("should get user's saved locations", async () => {
    const result = await testServer.executeOperation({query: userQuery.query});
    return expect(result.data.user.savedLocations).toBeDefined();
  });
  
  it("should get user's followed users", async () => {
    const result = await testServer.executeOperation({query: userQuery.query});
    return expect(result.data.user.followedUsers).toBeDefined();
  });

});