import Profile from '../views/profile/profile';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/profile';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.dashboard;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

