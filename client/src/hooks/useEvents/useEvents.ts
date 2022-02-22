import { useQuery } from '@apollo/client';
import { GET_EVENTS } from '../../graphql/queries';

const useEvents = () => {
  const queryVariables = {};

  const { data, loading, ...result } = useQuery(GET_EVENTS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  return {
    events: data ? data.events : undefined,
    loading,
    ...result,
  };
};

export default useEvents;
