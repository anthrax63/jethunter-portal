import {actions} from '../../actions/graphql/login';

const initState = {
  loginOk: false,
  touched: false
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
  case actions.success:
    return {
      ...state,
      loginOk: action.payload.result,
      touched: true
    };
  default:
    return {...state};
  }
};

export default chatReducer;
