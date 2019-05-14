import FacebookSalesChannelPage from '../views/pages/salesChannels/facebookSalesChannelPage';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/salesChannels/facebook/facebookSalesChannel';
import {bindActionCreators} from 'redux';
import withFirebaseAuth from 'react-with-firebase-auth';
import {firebaseAppAuth, salesProviders} from '../firebase';

const mapStateToProps = (state) => {
  return state.facebookSalesChannel;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};


export default withFirebaseAuth({firebaseAppAuth, providers: salesProviders})(connect(mapStateToProps, mapDispatchToProps)(FacebookSalesChannelPage));

