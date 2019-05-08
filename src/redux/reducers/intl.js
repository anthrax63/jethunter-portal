import {actions} from '../actions/intl';

const initState = {
  locale: localStorage.getItem('locale') || 'en'
};

const intlReducer = (state = initState, action) => {
  switch (action.type) {
  case actions.SET_LOCALE:
    return {
      ...state,
      locale: action.payload.locale
    };
  default:
    return {...state};
  }
};

export default intlReducer;
