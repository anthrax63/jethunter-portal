import {actions} from '../../actions/graphql/profile/fetchCurrentUser';
import {createInitState, createFetchReducer} from '../helpers/fetchReducer';

export default createFetchReducer(createInitState(), actions);
