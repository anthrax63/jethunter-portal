import Login from '../views/pages/login';

import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/login';
import * as actionCreatorsGoogle from '../redux/actions/graphql/signInWithGoogle';
import * as actionCreatorsFacebook from '../redux/actions/graphql/signInWithFacebook';
import {bindActionCreators} from 'redux';
import withFirebaseAuth from 'react-with-firebase-auth';
import {firebaseAppAuth, providers} from '../firebase';


const mapStateToProps = (state) => {
  return state.me;
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    ...bindActionCreators(actionCreatorsGoogle, dispatch),
    ...bindActionCreators(actionCreatorsFacebook, dispatch)
  };
};


export default withFirebaseAuth({firebaseAppAuth, providers})(connect(mapStateToProps, mapDispatchToProps)(Login));

