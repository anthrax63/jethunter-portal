import Register from '../views/pages/register';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/register';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.me;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);

