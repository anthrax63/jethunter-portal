import {actions} from '../../actions/graphql/me';

const initState = {};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actions.success:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {...state};
  }
};

export default reducer;
