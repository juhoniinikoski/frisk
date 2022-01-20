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

describe('follow/unfollow antoher user', () => {

  const { query } = userQueryTest
  const { id, mutation } = followUserMutation

  test(`mutation: ${id}`, async () => {
    const initial = await testServer.executeOperation({query: query})
    const initialUser: Partial<User> = initial.data.user
    await testServer.executeOperation({query: mutation})
    let result = await testServer.executeOperation({query: query})
    let user: Partial<User> = result.data.user
    expect(user.following.length).toBe(initialUser.following.length + 1)
    await testServer.executeOperation({query: mutation})
    result = await testServer.executeOperation({query: query})
    user = result.data.user
    return expect(user.following.length).toBe(initialUser.following.length)
  })

})

afterAll(done => {
  done()
})