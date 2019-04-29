import Login from '../views/pages/login';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/login';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.me;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);

