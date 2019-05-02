import Profile from '../views/profile/profile';

import {connect} from 'react-redux';
import fetchCurrentUser from '../redux/actions/graphql/profile/fetchCurrentUser';
import fillBrokerInfo from '../redux/actions/graphql/profile/fillBrokerInfo';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.profile;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchCurrentUser, fillBrokerInfo}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

