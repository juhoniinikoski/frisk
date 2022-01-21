import testServer from '../config/testServer'
import { User } from '../../entities'

const userQueryTest = {
    id: 'user',
    query: `
      query {
        user(id: "bbe42984-051b-4a01-b45d-b8d29c32200c") {
          username
          saved {
            eventTitle
            location {
              name
            }
          }
          following {
            username
          }
        }
      }
    `
}

const followUserMutation = {
  id: 'followUser',
  mutation: `
    mutation {
      followUser(followedId: "753f3e99-e73a-43a3-9a50-b30d7727c0eb")
    }
  `
}

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
}

const saveEventMutation = {
  id: 'saveEvent',
  mutation: `
    mutation {
      saveEvent(eventId: "johndoe.Testievent")
    }
  `
}

const saveSportMutation = {
  id: 'saveSport',
  mutation: `
    mutation {
      saveSport(sportId: "1")
    }
  `
}


describe('user creation and deleting', () => {

  const { mutation } = createUserMutation

  test('new user', async () => {
    const mutate = await testServer.executeOperation({query: mutation})
    expect(mutate.data.createUser.email).toEqual("testi@gmail.com")
    return expect(mutate.data.createUser.username).toEqual("testikäyttäjä")
  })

  test('already taken username', async () => {
    const mutate = await testServer.executeOperation({query: mutation})
    return expect(mutate.errors[0].message).toContain("Username testikäyttäjä is already taken. Choose another username")
  })

})

describe('follow/unfollow antoher user', () => {

  const { query } = userQueryTest
  const { mutation } = followUserMutation

  let initialUser: Partial<User> = null

  test('follow', async () => {
    const initial = await testServer.executeOperation({query: query})
    initialUser = initial.data.user
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user: Partial<User> = result.data.user
    return expect(user.following.length).toBe(initialUser.following.length + 1)
  })

  test('unfollow', async () => {
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user = result.data.user
    return expect(user.following.length).toBe(initialUser.following.length)
  })

})


describe('save event', () => {

  const { mutation } = saveEventMutation
  const { query } = userQueryTest

  let initialUser: Partial<User> = null

  test('save', async () => {
    const initial = await testServer.executeOperation({query: query})
    initialUser = initial.data.user
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user: Partial<User> = result.data.user
    return expect(user.saved.length).toBe(initialUser.saved.length + 1)
  })

  test('unsave', async () => {
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user = result.data.user
    return expect(user.saved.length).toBe(initialUser.saved.length)
  })

})


describe('save sport', () => {

  const { mutation } = saveSportMutation
  const { query } = userQueryTest

  let initialUser: Partial<User> = null

  test('save', async () => {
    const initial = await testServer.executeOperation({query: query})
    initialUser = initial.data.user
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user: Partial<User> = result.data.user
    return expect(user.favorites.length).toBe(initialUser.favorites.length + 1)
  })

  test('unsave', async () => {
    await testServer.executeOperation({query: mutation})
    const result = await testServer.executeOperation({query: query})
    const user = result.data.user
    return expect(user.favorites.length).toBe(initialUser.favorites.length)
  })

})

// lokaation tallentaminen ja tallennuksen poisto

afterAll(done => {
  done()
})