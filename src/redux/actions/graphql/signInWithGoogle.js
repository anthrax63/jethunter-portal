import {handleError} from './helpers/errorHandler';

const actionPrefix = 'SIGN_IN_WITH_GOOGLE';
const actionList = [
  'start',
  'success',
  'error'
];
export const actions = {};
actionList.forEach((item) => {
  actions[item.toLowerCase()] = `${actionPrefix}_${item.toUpperCase()}`;
});

export function loginWithGoogle(variables) {
  const query = `mutation($accessToken: String!) {
    signInWithGoogle(accessToken: $accessToken) {
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
