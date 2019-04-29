import {handleError} from './helpers/errorHandler';

const actionPrefix = 'FETCH_CURRENT_USER';
const actionList = [
  'start',
  'success',
  'error'
];
export const actions = {};
actionList.forEach((item) => {
  actions[item.toLowerCase()] = `${actionPrefix}_${item.toUpperCase()}`;
});

export function register(variables) {
  const query = `mutation($login: String!, $password: String!, $firstName: String!, $lastName: String!) {
    register(login: $login, password: $password, firstName: $firstName, lastName: $lastName) {
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
