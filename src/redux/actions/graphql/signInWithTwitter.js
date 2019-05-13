import {handleError} from './helpers/errorHandler';

const actionPrefix = 'SIGN_IN_WITH_TWITTER';
const actionList = [
  'start',
  'success',
  'error'
];
export const actions = {};
actionList.forEach((item) => {
  actions[item.toLowerCase()] = `${actionPrefix}_${item.toUpperCase()}`;
});

export function loginWithTwitter(variables) {
  const query = `mutation($accessToken: String!, $secret: String!) {
    signInWithTwitter(accessToken: $accessToken, secret: $secret) {
      result
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    dispatch({type: actions.start, payload: {}});
    const response = await graphqlRequest(query, variables);
    if (response.errors) {
      dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    dispatch({type: actions.success, payload: {...response.data}});
    history.replace('/');
    return {...response.data};
  };
}
