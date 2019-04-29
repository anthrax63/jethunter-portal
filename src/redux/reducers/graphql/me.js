import {actions} from '../../actions/graphql/me';

const initState = {
  user: {},
  isLoggedIn: false
};

const chatReducer = (state = initState, action) => {
  switch (action.type) {
  case actions.success:
    return {
      ...state,
      user: action.payload
    };
  default:
    return {...state};
  }
};

export default chatReducer;
