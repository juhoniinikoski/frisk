import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query Events(
    $location: ID
    $activity: ID
    $user: ID
    $savedBy: ID
    $searchKeyword: String
  ) {
    events(
      location: $location
      activity: $activity
      user: $user
      savedBy: $savedBy
      searchKeyword: $searchKeyword
    ) {
      name
      id
      location {
        name
        latitude
        longitude
      }
      activity {
        name
        id
      }
      price
      start
      end
    }
  }
`;
