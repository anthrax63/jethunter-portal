import App from '../app/app';
import {connect} from 'react-redux';
import * as actionCreators from '../redux/actions/graphql/me';
import * as actionCreatorsLogout from '../redux/actions/graphql/logout';
import * as actionCreatorsIntl from '../redux/actions/intl';
import {bindActionCreators} from 'redux';


const mapStateToProps = (state) => {
  return {...state.me, ...state.intl};
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    ...bindActionCreators(actionCreatorsLogout, dispatch),
    ...bindActionCreators(actionCreatorsIntl, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
