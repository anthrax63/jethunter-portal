import Dashboard from '../views/dashboard/brokerDashboard';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/dashboard';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.dashboard;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

