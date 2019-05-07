import Profile from '../views/profile/profile';

import {connect} from 'react-redux';
import fetchCurrentUser from '../redux/actions/graphql/profile/fetchCurrentUser';
import fillBrokerInfo from '../redux/actions/graphql/profile/fillBrokerInfo';
import uploadFile from '../redux/actions/graphql/uploadFile';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return state.profile;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchCurrentUser, fillBrokerInfo, uploadFile}, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

