import {getActions} from '../../../../actions/graphql/salesChannels/facebook/facebookSalesChannel';

const initState = {enabled: false};

const reducer = (state = initState, action) => {
  switch (action.type) {
  case getActions.start:
    return {
      ...state,
      loaded: false,
      loading: true
    };
  case getActions.success:
    return {
      ...state,
      ...action.payload,
      loaded: true,
      loading: false
    };
  case getActions.error:
    return {
      ...state,
      loaded: false,
      loading: false
    };
  default:
    return {...state};
  }
};

export default reducer;
