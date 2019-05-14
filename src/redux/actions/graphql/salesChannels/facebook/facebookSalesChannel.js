import {handleError} from '../../helpers/errorHandler';

const actionPrefix = 'FB_SALES_CHANNEL';
const actionList = [
  'start',
  'success',
  'error'
];


export function loadPages(variables) {
  const query = `query($accessToken: String!) {
    facebookSalesChannel { 
      getPages(accessToken: $accessToken) {
        name,
        id,
        logoUrl
      }
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    // dispatch({type: actions.start, payload: {}});
    const response = await graphqlRequest(query, variables);
    if (response.errors) {
      // dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    // dispatch({type: actions.success, payload: {...response.data.me}});
    return response.data.facebookSalesChannel.getPages;
  };
}

export function disable(variables) {
  const query = `mutation {
    facebookSalesChannel { 
      disable
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    // dispatch({type: actions.start, payload: {}});
    const response = await graphqlRequest(query, variables);
    if (response.errors) {
      // dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    // dispatch({type: actions.success, payload: {...response.data.me}});
  };
}

export function enable(variables) {
  const query = `mutation($accessToken: String!, $pageId: String!) {
    facebookSalesChannel { 
      enable(accessToken: $accessToken, pageId: $pageId) {
        pageName,
        pageId,
        pageLogo {
          link
        }
      }
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    // dispatch({type: actions.start, payload: {}});
    const response = await graphqlRequest(query, variables);
    if (response.errors) {
      // dispatch({type: actions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    // dispatch({type: actions.success, payload: {...response.data.me}});
    return response.data.facebookSalesChannel.enable;
  };
}

export const getActions = {};
actionList.forEach((item) => {
  getActions[item.toLowerCase()] = `${actionPrefix}_GET_${item.toUpperCase()}`;
});
export function get(variables) {
  const query = `query {
    facebookSalesChannel { 
      get {
        enabled,
        pageName,
        pageId,
        pageLogo {
          link
        }
      }
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    dispatch({type: getActions.start, payload: {}});
    const response = await graphqlRequest(query, variables);
    if (response.errors) {
      dispatch({type: getActions.error, payload: {errors: response.errors}});
      return handleError(response, {history});
    }
    dispatch({type: getActions.success, payload: {...response.data.facebookSalesChannel.get}});
    return response.data.facebookSalesChannel.get;
  };
}
