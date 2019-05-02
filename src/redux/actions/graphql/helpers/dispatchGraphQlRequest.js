import {handleError} from './errorHandler';

async function dispatchGraphQlRequest(query, variables, actions, dispatch, {graphqlRequest, history}) {
  dispatch({type: actions.start, payload: {}});
  const response = await graphqlRequest(query, variables);
  if (response.errors) {
    dispatch({type: actions.error, payload: {errors: response.errors}});
    return handleError(response, {history});
  }
  dispatch({type: actions.success, payload: {...response.data}});
  return true;
}


export default dispatchGraphQlRequest;
