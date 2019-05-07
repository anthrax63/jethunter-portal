import dispatchGraphQlRequest from '../helpers/dispatchGraphQlRequest';
import createFetchActions from '../helpers/createFetchActions';

export const actions = createFetchActions('PROFILE_FETCH_CURRENT_USER');

export default function fetchCurrentUser(variables) {
  const query = `query {
    result: me {
      login,
      firstName,
      lastName,
      description,
      company,
      jetmanId,
      photo {
        id,
        link
      }
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    await dispatchGraphQlRequest(query, variables, actions, dispatch, {graphqlRequest, history});
  };
}
