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

export function fillBrokerInfo(variables) {
  const query = `mutation($firstName: String, $lastName: String, $description: String!, $company: String!, $jetmanId: String!) {
    fillBrokerInfo(firstName: $firstName, lastName: $lastName, description: $description, company: $company, jetmanId: $jetmanId) {
      firstName,
      lastName
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

export function fetchCurrentUser() {
  const query = `query {
    me {
      login,
      firstName,
      lastName,
      brokerInfo {
        description,
        company,
        jetmanId
      }
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    dispatch({type: actions.start, payload: {}});
    const response = await graphqlRequest(query);
    if (response.errors) {
      dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    dispatch({type: actions.success, payload: {...response.data.me}});
    return {...response.data.me};
  };
}
