import dispatchGraphQlRequest from '../helpers/dispatchGraphQlRequest';
import createFetchActions from '../helpers/createFetchActions';
import {toastr} from 'react-redux-toastr';


export const actions = createFetchActions('PROFILE_FILL_BROKER_INFO');

export default function fillBrokerInfo(variables) {
  const query = `mutation($firstName: String, $lastName: String, $description: String!, $company: String!, $jetmanId: String!, $photo: ID!) {
    fillBrokerInfo(firstName: $firstName, lastName: $lastName, description: $description, company: $company, jetmanId: $jetmanId, photo: $photo) {
      firstName,
      lastName
    }
  }`;
  return async (dispatch, getState, {graphqlRequest, history}) => {
    const vars = {...variables};
    if (vars.photo && vars.photo.id) {
      vars.photo = vars.photo.id;
    }
    const result = await dispatchGraphQlRequest(query, vars, actions, dispatch, {graphqlRequest, history});
    if (result) {
      toastr.success('Successfully saved!');
    }
  };
}
