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

export function fetchCurrentUser() {
  const query = `query {
    me {
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
