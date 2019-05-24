// import external modules
import {combineReducers} from 'redux';
// import internal(own) modules
import me from './graphql/me';
import login from './graphql/login';
import dashboard from './graphql/dashboard';
import profile from './graphql/profile';
import intl from './intl';
import facebookSalesChannel from './graphql/salesChannels/facebook/facebookSalesChannel';


import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  intl,
  me,
  login,
  dashboard,
  facebookSalesChannel,
  profile,
  toastr: toastrReducer // <- Mounted at toastr.
});

export default rootReducer;
